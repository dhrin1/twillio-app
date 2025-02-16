export const currencyFormatter = (defaultCurrency = "USD", amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: defaultCurrency,
  }).format(amount);
};

export const getCurrDate = () => {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-PH", options)
    .format(currentDate)
    .replace(" at ", " ");
};

export const voiceRemark = (() => {
  const status = {
    P: "Waiting",
    A: "Accepted",
    F: "Failed",
  };
  return {
    get: (remark) => {
      return status[remark];
    },
  };
})();
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${year}`;
};

export const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
