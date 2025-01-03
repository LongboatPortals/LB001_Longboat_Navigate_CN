export let phoneNumber = (phoneNumber) => {
    const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return regex.test(phoneNumber);
}