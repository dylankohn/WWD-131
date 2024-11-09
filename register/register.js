let participants = 1;
const addParticipant = document.getElementById('add');
const participantsFieldset = document.getElementById('participants');

addParticipant.addEventListener('click', function() {
    participants++;

    let participant = document.createElement('div');
    participant.classList.add(`participant${participants}`);

    participant.innerHTML = `
        <section class="participant${participants}">
            <label for="fname${participants}">First Name:</label>
            <input type="text" id="fname${participants}" name="fname${participants}" required>

            <label for="activity${participants}">Activity #:</label>
            <input type="text" id="activity${participants}" name="activity${participants}">

            <label for="fee${participants}">Fee ($):</label>
            <input type="number" id="fee${participants}" name="fee${participants}">

            <label for="date${participants}">Desired Date:</label>
            <input type="date" id="date${participants}" name="date${participants}">

            <label for="grade${participants}">Grade:</label>
            <select id="grade${participants}" name="grade${participants}">
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
            </select>
        </section>
    `;

    participantsFieldset.insertAdjacentElement('beforeend', participant);
});

function submitForm(event) {
    event.preventDefault();
    const totalFee = totalFees();
    const adultName = document.getElementById('adult_name').value;
    const numParticipants = participants;

    const info = {
        adultName: adultName,
        numParticipants: numParticipants,
        totalFee: totalFee
    };

    const successMessage = successTemplate(info);
    document.getElementById('summary').innerHTML = successMessage;
}

function successTemplate(info) {
    return `
        <h2>Registration Successful!</h2>
        <p>Thank you for registering, ${info.adultName}!</p>
        <p>Number of participants: ${info.numParticipants}</p>
        <p>Total fee: $${info.totalFee.toFixed(2)}</p>
    `;
}

function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    const total = feeElements.reduce((acc, curr) => {
        
        const fee = parseFloat(curr.value);
        if (isNaN(fee)) {
            return acc; // if the fee is not valid
        }
        return acc + fee;
    }, 0);
    return total;
    
}

document.getElementById('registrationForm').addEventListener('submit', submitForm);