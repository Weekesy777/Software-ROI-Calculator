document.addEventListener('DOMContentLoaded', function () {
    const inputs = {
        assumedProjectCost: 75000,
        employeesCount: 10,
        avgHourlyRate: 35,
        hoursSpentManual: 15,
        errorCost: 500,
        monthlyErrors: 4,
        growthLoss: 5000,
        laborSavingsReduction: 60,
        errorSavingsReduction: 75,
        growthSavingCapture: 80
    };

    const results = {
        laborSavings: 0,
        errorSavings: 0,
        growthOpportunity: 0,
        totalAnnualSavings: 0,
        fiveYearSavings: 0,
        roi: 0,
        labourSavingReduction: 0,
        errorSavingReduction: 0,
        growthSavingCapture: 0
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);
    };

    function calculateROI() {
        // Calculate labor savings
        const weeklyLaborHours = inputs.employeesCount * inputs.hoursSpentManual;
        const annualLaborSavings = weeklyLaborHours * 52 * inputs.avgHourlyRate * (1 - inputs.laborSavingsReduction / 100);

        // Calculate error-related savings
        const annualErrorSavings = inputs.errorCost * inputs.monthlyErrors * 12 * (1 - inputs.errorSavingsReduction / 100);

        // Calculate growth opportunity savings
        const annualGrowthSavings = inputs.growthLoss * 12 * (1 - inputs.growthSavingCapture / 100);

        // Calculate total savings and ROI
        const totalAnnual = annualLaborSavings + annualErrorSavings + annualGrowthSavings;
        const fiveYear = totalAnnual * 5;
        const roiPercentage = ((totalAnnual - inputs.assumedProjectCost) / inputs.assumedProjectCost) * 100;

        // Update results
        document.getElementById('laborSavings').textContent = formatCurrency(annualLaborSavings);
        document.getElementById('errorSavings').textContent = formatCurrency(annualErrorSavings);
        document.getElementById('growthOpportunity').textContent = formatCurrency(annualGrowthSavings);
        document.getElementById('totalAnnualSavings').textContent = formatCurrency(totalAnnual);
        document.getElementById('fiveYearSavings').textContent = formatCurrency(fiveYear);
        document.getElementById('roi').textContent = Math.round(roiPercentage) + '%';
    }

    // Add event listeners to input fields
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (event) => {
            const { id, value } = event.target;
            inputs[id] = parseInt(value) || 0;
            calculateROI();
        });
    });

    calculateROI(); // Initial calculation
});