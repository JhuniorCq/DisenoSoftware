import React, { useState } from "react";
import "../styles/calendarioSemanal.vista.css";

function CalendarioSemanal() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return days.map((day) => (
      <div key={day} className="calendar-day">
        {day}
      </div>
    ));
  };

  const getWeekDates = () => {
    const weekDates = [];
    const startDate = new Date(currentDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDates.push(
        <div key={i} className="calendar-num">
          {date.getDate()}
        </div>
      );
    }
    return weekDates;
  };

  const getHourCells = () => {
    const hours = ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am", "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm"];
    return hours.map((hour, index) => (
      <div key={index} className="calendar-row">
        <div className="calendar-cell-hora">{hour}</div>
        {/* Añade las celdas con contenido aquí */}
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
        <div className="calendar-cell"> </div>
      </div>
    ));
  };

  const getMonthHeader = () => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
      <div className="month-header">
        <span>{month} {year}</span>
      </div>
    );
  };

  return (
    <div>
      <button id="prevWeek" onClick={handlePrevWeek}>
        {"<"}
      </button>
      <button id="nextWeek" onClick={handleNextWeek}>
        {">"}
      </button>

      {getMonthHeader()}

      <div className="container">
        <div className="calendar">
          <div className="calendar-row">
            <div className="calendar-day-hor"></div>
            {getWeekDays()}
          </div>
          <div className="calendar-row">
            <div className="calendar-num-hor"></div>
            {getWeekDates()}
          </div>

          {getHourCells()}
        </div>
      </div>
    </div>
  );
}

export default CalendarioSemanal;
