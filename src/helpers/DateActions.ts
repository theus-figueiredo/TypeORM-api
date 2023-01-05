import moment from "moment";

class DateActions {
  public getDateAsString(): string {
    return moment().format("DD/MM/YYYY");
  };


  public isValidDate(date: string): Boolean {
    return moment(date, "DD/MM/YYYY", true).isValid();
  };

};

export default new DateActions();
