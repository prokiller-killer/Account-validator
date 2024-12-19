document.getElementById('validateButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const status = document.getElementById('status');

    if (!fileInput.files[0]) {
        status.textContent = "Please upload a file.";
        return;
    }

    status.textContent = "Uploading file...";

    const formData = new FormData();
    formData.append("accounts_file", fileInput.files[0]);

    try {
        const response = await fetch("/validate", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to validate accounts.");

        const result = await response.json();
        status.textContent = `Validation complete: ${result.validAccounts.length} valid accounts.`;
        console.log("Valid Accounts:", result.validAccounts);
    } catch (error) {
        status.textContent = "Error: " + error.message;
    }
});
