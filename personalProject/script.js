document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generateResume").addEventListener("click", () => {
        console.log("Button clicked!");

        const formValues = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            linkedin: document.getElementById("linkedin").value,
            summary: document.getElementById("summary").value,
            skills: document.getElementById("skills").value,
            schools: document.getElementById("schools").value,
            degrees: document.getElementById("degrees").value,
            workOrganizations: document.getElementById("workOrganizations").value,
            workYears: document.getElementById("workYears").value,
            volunteerOrganizations: document.getElementById("volunteerOrganizations").value,
            volunteerYears: document.getElementById("volunteerYears").value
        };

        const safeSplit = (value) => {
            if (value.trim() === "") return [];
            return value.split("\n\n").map(entry => {
                const lines = entry.split("\n").map(line => line.trim());
                return lines;
            });
        };

        formValues.schools = safeSplit(formValues.schools);
        formValues.degrees = safeSplit(formValues.degrees);
        formValues.workOrganizations = safeSplit(formValues.workOrganizations);
        formValues.workYears = safeSplit(formValues.workYears);
        formValues.volunteerOrganizations = safeSplit(formValues.volunteerOrganizations);
        formValues.volunteerYears = safeSplit(formValues.volunteerYears);

        const education = formValues.schools.map((school, index) => {
            return [school, formValues.degrees[index] || ''];
        });

        const workExperience = formValues.workOrganizations.map((org, index) => {
            return [org, formValues.workYears[index] || ''];
        });

        const volunteerWork = formValues.volunteerOrganizations.map((org, index) => {
            return [org, formValues.volunteerYears[index] || ''];
        });

        formValues.education = education;
        formValues.experience = workExperience;
        formValues.volunteer = volunteerWork;

        console.log(formValues);

        localStorage.setItem("resumeData", JSON.stringify(formValues));

        // Redirect to the resume page
        window.location.href = "resume.html";
    });
});
