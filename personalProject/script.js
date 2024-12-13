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
            schools: document.getElementById("schools").value, // Collect schools
            degrees: document.getElementById("degrees").value, // Collect degrees
            workOrganizations: document.getElementById("workOrganizations").value, // Collect work organizations
            workYears: document.getElementById("workYears").value, // Collect work years
            volunteerOrganizations: document.getElementById("volunteerOrganizations").value, // Collect volunteer organizations
            volunteerYears: document.getElementById("volunteerYears").value  // Collect volunteer years
        };

        // Helper function to safely split and map values
        const safeSplit = (value) => {
            if (value.trim() === "") return [];
            return value.split("\n\n").map(entry => {
                const lines = entry.split("\n").map(line => line.trim());
                return lines;
            });
        };

        // Safely process the education, work experience, and volunteer work sections
        formValues.schools = safeSplit(formValues.schools);
        formValues.degrees = safeSplit(formValues.degrees);
        formValues.workOrganizations = safeSplit(formValues.workOrganizations);
        formValues.workYears = safeSplit(formValues.workYears);
        formValues.volunteerOrganizations = safeSplit(formValues.volunteerOrganizations);
        formValues.volunteerYears = safeSplit(formValues.volunteerYears);

        // Pair schools with degrees
        const education = formValues.schools.map((school, index) => {
            return [school, formValues.degrees[index] || '']; // Ensure there's a degree to match
        });

        // Pair work organizations with years
        const workExperience = formValues.workOrganizations.map((org, index) => {
            return [org, formValues.workYears[index] || '']; // Ensure there's a year to match
        });

        // Pair volunteer organizations with years
        const volunteerWork = formValues.volunteerOrganizations.map((org, index) => {
            return [org, formValues.volunteerYears[index] || '']; // Ensure there's a year to match
        });

        formValues.education = education;
        formValues.experience = workExperience;
        formValues.volunteer = volunteerWork;

        console.log(formValues); // To debug and check if the values are properly collected

        // Store form data in localStorage
        localStorage.setItem("resumeData", JSON.stringify(formValues));

        // Redirect to the resume page
        window.location.href = "resume.html";
    });
});
