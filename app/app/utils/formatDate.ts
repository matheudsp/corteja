export const formatCouponDate = (dateEnd: string) => {
    const date = new Date(dateEnd);
    const day = String(date.getDate()).padStart(2, '0');  // Get day and pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month (0-indexed, so +1)

    return `Válido até ${day}/${month}`;
};