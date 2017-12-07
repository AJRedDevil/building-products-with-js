import moment from 'moment';

export const convertStringToDate = strDate => moment(strDate).toDate();
export const convertDateToISOString = dateType => moment(dateType).toISOString();
