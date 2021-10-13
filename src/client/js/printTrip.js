import { jsPDF } from "jspdf";
const printWrapper = document.getElementById('print-div');
// const tripDateWrapper = document.querySelector('.dates');
const contentWrapper = document.querySelector('.bottom');

const printTrip = () => {
    const printButton = document.createElement("input");
    printButton.setAttribute("type", "submit");
    printButton.setAttribute("id", "print-trip");
    printButton.setAttribute("value", "Print Trip");
    printWrapper.appendChild(printButton);

    const printTrip = () => {
        const doc = new jsPDF({
            unit: "mm",
            format: [700, 700]
        });
        doc.html(contentWrapper, {
            callback: function (doc) {
                doc.save("trip-details.pdf");
            },
            x: 15,
            y: 15,
        });
    }

    printButton.addEventListener("click", printTrip);
}

export { printTrip }