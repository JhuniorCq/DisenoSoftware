import React, { useState, useEffect } from "react";
import "../styles/calendario.vista.css";

function VistaCalendarioComponent({ selectedDates, setSelectedDates }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    const daysArray = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      daysArray.push(<li key={`inactive-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
      const isSelected = selectedDates.includes(i);

      daysArray.push(
        <li
          key={i}
          className={isSelected ? "active" : isToday ? "today" : ""}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      daysArray.push(<li key={`inactive-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
    }

    setDays(daysArray);
  };

  const handleDateClick = (day) => {
    const updatedSelectedDates = [...selectedDates];

    if (updatedSelectedDates.includes(day)) {
      updatedSelectedDates.splice(updatedSelectedDates.indexOf(day), 1);
    } else {
      updatedSelectedDates.push(day);
    }

    setSelectedDates(updatedSelectedDates);
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11); // Diciembre
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0); // Enero
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    console.log("Next Month: ", currentMonth, currentYear); // Agrega esta línea
  };

  useEffect(() => {
    renderCalendar();
  }, [currentYear, currentMonth, selectedDates]);

  return (
    <div className="wrapper">
      <header>
      <button className="prev-button" onClick={goToPreviousMonth}>
        {"<"} {}</button>
      <p className="current-date">{`${months[currentMonth]} ${currentYear}`}</p>
      <button className="next-button" onClick={goToNextMonth}>
        {">"}{}</button>
</header>


      <div className="calendar">
        <ul className="weeks">
          <li>Lun</li>
          <li>Mar</li>
          <li>Mie</li>
          <li>Jue</li>
          <li>Vie</li>
          <li>Sab</li>
          <li>Dom</li>
        </ul>
        <ul className="days">
          {days.map((day, index) => (
            <li
              key={index}
              className={day.props.className}
              onClick={() => handleDateClick(day.props.children)}
            >
              {day.props.children}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VistaCalendarioComponent;