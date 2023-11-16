const sendEventSample = () => {
  const eventObj = new CSXSEvent();
  eventObj.type = "sampleEvent";
  eventObj.data = "data from jsx";
  eventObj.dispatch();
};
