const sortDateStrings = (dateString1: string, dateString2: string) => {
    return new Date(dateString1).getTime() - new Date(dateString2).getTime();
};

export {sortDateStrings}
