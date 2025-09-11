// Pickup Schedule JavaScript
class PickupScheduler {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
        this.pricingRates = {
            small: { base: 50, convenience: 10 },
            medium: { base: 100, convenience: 15 },
            large: { base: 200, convenience: 25 }
        };
        
        this.init();
    }

    init() {
        this.setMinDate();
        this.bindEvents();
        this.updateSummary();
    }

    setMinDate() {
        const dateInput = document.getElementById('pickup-date');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    bindEvents() {
        // Navigation buttons
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }

        // Form inputs change events
        const form = document.getElementById('pickup-form');
        if (form) {
            form.addEventListener('change', () => {
                this.collectFormData();
                this.updateSummary();
            });

            form.addEventListener('input', () => {
                this.collectFormData();
                this.updateSummary();
            });
        }

        // Quantity selector change
        const quantityOptions = document.querySelectorAll('input[name="quantity"]');
        quantityOptions.forEach(option => {
            option.addEventListener('change', () => {
                this.updatePricing();
            });
        });
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepDisplay();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
        }
    }

    updateStepDisplay() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // Update navigation buttons
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (prevBtn) {
            prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-flex';
        }

        if (this.currentStep === this.totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    validateCurrentStep() {
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentStepEl) return false;

        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--red-600)';
                field.focus();
            } else {
                field.style.borderColor = 'var(--color-border)';
            }
        });

        // Special validation for step 2 (waste types)
        if (this.currentStep === 2) {
            const wasteTypes = document.querySelectorAll('input[name="waste-type"]:checked');
            if (wasteTypes.length === 0) {
                isValid = false;
                alert('Please select at least one waste type.');
            }
        }

        // Special validation for step 3 (time slot)
        if (this.currentStep === 3) {
            const timeSlot = document.querySelector('input[name="time-slot"]:checked');
            if (!timeSlot) {
                isValid = false;
                alert('Please select a time slot.');
            }
        }

        return isValid;
    }

    collectFormData() {
        const form = document.getElementById('pickup-form');
        if (!form) return;

        const formData = new FormData(form);
        this.formData = {};

        // Collect all form data
        for (let [key, value] of formData.entries()) {
            if (this.formData[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(this.formData[key])) {
                    this.formData[key].push(value);
                } else {
                    this.formData[key] = [this.formData[key], value];
                }
            } else {
                this.formData[key] = value;
            }
        }

        // Handle waste types separately
        const wasteTypes = [];
        document.querySelectorAll('input[name="waste-type"]:checked').forEach(checkbox => {
            wasteTypes.push(checkbox.value);
        });
        this.formData['waste-types'] = wasteTypes;
    }

    updateSummary() {
        const summaryContent = document.getElementById('summary-content');
        if (!summaryContent) return;

        if (Object.keys(this.formData).length === 0) {
            summaryContent.innerHTML = `
                <div class="summary-empty">
                    <div class="empty-icon">📋</div>
                    <p>Fill out the form to see your pickup summary</p>
                </div>
            `;
            return;
        }

        const summaryHTML = this.generateSummaryHTML();
        summaryContent.innerHTML = summaryHTML;
        
        this.updatePricing();
    }

    generateSummaryHTML() {
        const details = [];

        // Location
        if (this.formData['pickup-type']) {
            const typeMap = {
                'residential': '🏠 Residential',
                'commercial': '🏢 Commercial',
                'community': '🏘️ Community'
            };
            details.push({
                label: 'Pickup Type',
                value: typeMap[this.formData['pickup-type']] || this.formData['pickup-type']
            });
        }

        if (this.formData['address']) {
            details.push({
                label: 'Address',
                value: this.formData['address'].substring(0, 50) + (this.formData['address'].length > 50 ? '...' : '')
            });
        }

        if (this.formData['contact-name']) {
            details.push({
                label: 'Contact',
                value: this.formData['contact-name']
            });
        }

        // Waste types
        if (this.formData['waste-types'] && this.formData['waste-types'].length > 0) {
            const wasteTypeMap = {
                'wet-waste': 'Wet Waste',
                'dry-waste': 'Dry Waste',
                'e-waste': 'E-Waste',
                'hazardous': 'Hazardous',
                'construction': 'Construction',
                'garden': 'Garden Waste'
            };
            
            const wasteTypesText = this.formData['waste-types']
                .map(type => wasteTypeMap[type] || type)
                .join(', ');
            
            details.push({
                label: 'Waste Types',
                value: wasteTypesText
            });
        }

        if (this.formData['quantity']) {
            const quantityMap = {
                'small': 'Small (1-2 bags)',
                'medium': 'Medium (3-5 bags)',
                'large': 'Large (6+ bags)'
            };
            details.push({
                label: 'Quantity',
                value: quantityMap[this.formData['quantity']] || this.formData['quantity']
            });
        }

        // Schedule
        if (this.formData['pickup-date']) {
            const date = new Date(this.formData['pickup-date']);
            details.push({
                label: 'Pickup Date',
                value: date.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            });
        }

        if (this.formData['time-slot']) {
            const timeSlotMap = {
                'morning': '🌅 Morning (6:00 AM - 10:00 AM)',
                'afternoon': '☀️ Afternoon (10:00 AM - 2:00 PM)',
                'evening': '🌆 Evening (2:00 PM - 6:00 PM)'
            };
            details.push({
                label: 'Time Slot',
                value: timeSlotMap[this.formData['time-slot']] || this.formData['time-slot']
            });
        }

        if (this.formData['frequency']) {
            const frequencyMap = {
                'one-time': 'One-time Pickup',
                'weekly': 'Weekly',
                'bi-weekly': 'Bi-weekly',
                'monthly': 'Monthly'
            };
            details.push({
                label: 'Frequency',
                value: frequencyMap[this.formData['frequency']] || this.formData['frequency']
            });
        }

        let html = '<div class="summary-details">';
        details.forEach(detail => {
            html += `
                <div class="detail-item">
                    <span class="detail-label">${detail.label}</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `;
        });
        html += '</div>';

        return html;
    }

    updatePricing() {
        const quantity = this.formData['quantity'] || 'small';
        const rates = this.pricingRates[quantity];

        if (rates) {
            const serviceCharge = rates.base;
            const convenienceFee = rates.convenience;
            const total = serviceCharge + convenienceFee;

            const serviceChargeEl = document.getElementById('service-charge');
            const convenienceFeeEl = document.getElementById('convenience-fee');
            const totalAmountEl = document.getElementById('total-amount');

            if (serviceChargeEl) serviceChargeEl.textContent = `₹${serviceCharge}`;
            if (convenienceFeeEl) convenienceFeeEl.textContent = `₹${convenienceFee}`;
            if (totalAmountEl) totalAmountEl.textContent = `₹${total}`;
        }
    }

    generateBookingId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `WW-${new Date().getFullYear()}-${String(timestamp).slice(-6)}${random}`;
    }

    submitForm() {
        if (!this.validateCurrentStep()) {
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            this.showSuccessModal();
            
            // Reset loading state
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }, 2000);
    }

    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        if (!modal) return;

        // Generate booking ID
        const bookingId = this.generateBookingId();
        
        // Update modal content
        const bookingIdEl = document.getElementById('booking-id');
        const confirmDateEl = document.getElementById('confirm-date');
        const confirmTimeEl = document.getElementById('confirm-time');
        const confirmCostEl = document.getElementById('confirm-cost');

        if (bookingIdEl) bookingIdEl.textContent = bookingId;
        
        if (confirmDateEl && this.formData['pickup-date']) {
            const date = new Date(this.formData['pickup-date']);
            confirmDateEl.textContent = date.toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        if (confirmTimeEl && this.formData['time-slot']) {
            const timeSlotMap = {
                'morning': 'Morning (6:00 AM - 10:00 AM)',
                'afternoon': 'Afternoon (10:00 AM - 2:00 PM)',
                'evening': 'Evening (2:00 PM - 6:00 PM)'
            };
            confirmTimeEl.textContent = timeSlotMap[this.formData['time-slot']] || this.formData['time-slot'];
        }

        if (confirmCostEl) {
            const totalEl = document.getElementById('total-amount');
            if (totalEl) {
                confirmCostEl.textContent = totalEl.textContent;
            }
        }

        modal.style.display = 'flex';
    }
}

// Global functions for modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function viewBookings() {
    closeModal();
    // In a real application, this would navigate to bookings page
    alert('Redirecting to your bookings page...');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PickupScheduler();
    
    // Close modal when clicking outside
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});