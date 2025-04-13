import { error, log } from "console";
import { rideModel } from "../Models/ride.model.js";
import { getDistanceTimeService } from "./maps.service.js";
import crypto from "crypto";
import { sendMessageToSocketId } from "../Socket.js";

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTimeService(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
        (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
    ),
  };

  return fare;
};

export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("all fields are required");
  }

  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOpt(6),
    fare: fare[vehicleType],
  });
  return ride;
};

export const getOpt = (num) => {
  function generateOtp(num) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    const otp = crypto.randomInt(min, max + 1).toString(); // Corrected usage

    return otp;
  }

  return generateOtp(num);
};

export const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  console.log(ride);

  return ride;
};

export const startRideService = async ({ rideId, otp, captain }) => {
  console.log("start rideing service❤️" + rideId, otp);

  if (!rideId || !otp) {
    throw new Error("Ride Id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride is not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid otp");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );
  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });
  return ride;
};

export const endRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("rideId is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );
  return ride;
};
