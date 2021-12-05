import moment from "moment";

export const scheduleByUserIdNormalize = (schedules) => {
  console.log(schedules);
  return schedules.map((schedule) => {
    const servicesList = [];
    schedule.servicesSchedules.map((serviceSchedule) =>
      servicesList.push(serviceSchedule.services)
    );

    let normalized = null;

    servicesList.map((service) => {
      normalized = {
        data: moment(schedule.date).format("DD/MM/YYYY"),
        hourInit: schedule.hourInit,
        hourEnd: schedule.hourEnd,
        schedulingHour: `${schedule.hourInit} às ${schedule.hourEnd}`,
        payment: "Dinheiro",
        serviceName: service.name,
        servicePrice: service.price,
        serviceDuration: service.time,
      };
    });

    return normalized;
  });
};
