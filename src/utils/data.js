export function getLatestData(dataArray) {
  const sortedDataArray = sortDataByDate(dataArray).reverse();
  return sortedDataArray[0];
}

export function sortDataByDate(dataArray) {
    return dataArray.sort((item1, item2) => {
        const dateTime1 = item1.year+item1.month+item1.day;
        const dateTime2 = item2.year+item2.month+item2.day;
        return dateTime1 - dateTime2;
      });
}