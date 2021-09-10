import moment from "moment";
const expiredcode : function = () => {
    const date = new Date()
    return moment(date).add(3, 'm').toDate();
  }
export default expiredcode
  