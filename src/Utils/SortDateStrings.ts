const sortDateStrings = (dateString1: Date, dateString2: Date) => {
    return new Date(dateString1) - new Date(dateString2);
};

export {sortDateStrings}
