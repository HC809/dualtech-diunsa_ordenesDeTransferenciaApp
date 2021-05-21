import moment from "moment";
import "moment/locale/es";

//SetTimeout Load TEST
export const setTimeoutTest = (delay: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};

//Formato numero con dos decimales
export function ToNumber(number: number) {
  return Number(number.toFixed(2));
}

//Obtener Fecha Actual
export const currentDate = (fecha: Date) => {
  fecha.setTime(fecha.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

  return fecha;
};

//Formato Fecha
export const dateNormalFormat = (fecha: Date) => {
  let initDate = moment(fecha);
  initDate.locale("es");

  return `${initDate.format("L")}`;
};

//Formato Hora
export const hourFormat = (fecha: Date) => {
  let initDate = moment(fecha);

  return `${initDate.format("h:mm:ss a")}`;
};

//UTC fecha
export const getUtcDate = (fecha: Date) => {
    return new Date(new Date(fecha).setTime((new Date(fecha).getTime() - new Date().getTimezoneOffset() * 60 * 1000)));
}


//Obetener minutos de diferencia entre la fecha del marcaje y la fecha actual
export const diffMinutes = (fechaFac: Date) => {
  let today = moment(currentDate(new Date()));
  let diffMs = moment.duration(today.diff(fechaFac));

  return ToNumber(diffMs.asMinutes());
};
