export const uuid = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};

/**
 * Helper Function to format Phone Numbers
 * @param (number)
 * @returns formatted number string
 */
export const formattedPhoneNumber = phoneNumberString => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        const intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
};
