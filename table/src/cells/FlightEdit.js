import React, { useState, useEffect } from "react";

const FlightEdit = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
    const [value, setValue] = useState(initialValue);
    const [oldValue] = useState(initialValue);
    const [isEdit, setEdit] = useState(false);

    const onFlightChange = (e) => {
        setValue({
            ...value,
            flightno: e.target.value
        });
    };

    const onDateChange = (e) => {
        setValue({
            ...value,
            date: getDateValue(e.target.value)
        });
    };

    const openEdit = (e) => {
        setEdit(true);
    };

    const saveEdit = () => {
        setEdit(false);
        updateMyData(index, id, value);
    };
    const clearEdit = () => {
        setValue(oldValue);
        setEdit(false);
    };

    const getDateValue = (dateValue, type) => {
        const date = new Date(dateValue);
        if (type === "calendar") {
            const dateTimeFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
            const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
            return `${year}-${month}-${day}`;
        } else {
            const dateTimeFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" });
            const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
            return `${day}-${month}-${year}`;
        }
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div className="flight-details content">
            <div className={`content-display ${isEdit ? "close" : "open"}`} onClick={openEdit}>
                <strong>{value.flightno}</strong>
                <span>{value.date}</span>
            </div>
            <div className={`content-edit ${isEdit ? "open" : "close"}`}>
                <input type="text" value={value.flightno} onChange={onFlightChange} />
                <input type="date" value={getDateValue(value.date, "calendar")} onChange={onDateChange} />
                <button onClick={saveEdit}>OK</button>
                <button onClick={clearEdit}>Cancel</button>
            </div>
        </div>
    );
};

export default FlightEdit;
