import moment from "moment";

class DateActions {
  public getDateAsString(): string {
    return moment().format("DD/MM/YYYY");
  };
};

export default new DateActions();
