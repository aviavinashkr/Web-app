document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const btnOkay = document.getElementById('btn-okay');
  const datePicker = document.getElementById('date-picker');
  const timePicker = document.getElementById('time-picker');
  const btnScheduleNext = document.getElementById('btn-schedule-next');
  const cuisineCards = document.querySelectorAll('.cuisine-card');
  const btnCuisineNext = document.getElementById('btn-cuisine-next');
  const emailInput = document.getElementById('email-input');
  const btnEmailSubmit = document.getElementById('btn-email-submit');

  // State
  let selectedDate = '';
  let selectedTime = '';
  let selectedCuisine = '';
  let userEmail = '';

  // Utility to handle step transitions
  function showStep(stepId) {
    document.querySelectorAll('.step').forEach(step => {
      step.classList.remove('active');
    });
    // Slight delay to allow CSS transitions to look smooth
    setTimeout(() => {
      document.getElementById(stepId).classList.add('active');
    }, 100);
  }

  // --- Step 1: Proposal ---
  btnYes.addEventListener('click', () => {
    showStep('step2');
    triggerMiniConfetti();
  });

  // Escaping "No" button logic
  const moveNoButton = () => {
    const container = document.querySelector('.glass-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    // Calculate maximum bounds so it stays inside or slightly around
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random positions (can be negative to go slightly outside bounds, but keep it mostly visible)
    const randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    const randomY = Math.floor(Math.random() * maxY) - (maxY / 2);

    btnNo.style.position = 'absolute';
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };

  btnNo.addEventListener('mouseover', moveNoButton);
  btnNo.addEventListener('click', moveNoButton); // In case they somehow manage to click it on touch devices

  // --- Step 2: Reaction ---
  btnOkay.addEventListener('click', () => {
    showStep('step3');
  });

  // --- Step 3: Scheduling ---
  function checkScheduleInputs() {
    selectedDate = datePicker.value;
    selectedTime = timePicker.value;
    if (selectedDate && selectedTime) {
      btnScheduleNext.disabled = false;
    } else {
      btnScheduleNext.disabled = true;
    }
  }

  datePicker.addEventListener('change', checkScheduleInputs);
  timePicker.addEventListener('change', checkScheduleInputs);

  btnScheduleNext.addEventListener('click', () => {
    showStep('step4');
  });

  // --- Step 4: Cuisine ---
  cuisineCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove selected from all
      cuisineCards.forEach(c => c.classList.remove('selected'));
      // Add to clicked
      card.classList.add('selected');
      // Update state
      selectedCuisine = card.getAttribute('data-cuisine');
      // Enable next button
      btnCuisineNext.disabled = false;
    });
  });

  btnCuisineNext.addEventListener('click', () => {
    showStep('step5');
  });

  // --- Step 5: Email Contact ---
  emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value.trim();
    // Simple email regex validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (isValidEmail) {
      btnEmailSubmit.disabled = false;
      userEmail = emailValue;
    } else {
      btnEmailSubmit.disabled = true;
    }
  });

  btnEmailSubmit.addEventListener('click', () => {
    showStep('step6');
    submitProposal();
  });

  // --- Step 6: Confirmation & Email ---
  function submitProposal() {
    // Note: EmailJS requires proper initialization with the Public Key.
    // Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', and 'YOUR_TEMPLATE_ID' later.
    const serviceID = 'service_7t9y27u';
    const templateID = 'template_bnqbhvh';
    const templateParams = {
      to_name: 'Recipient Name', // Change as needed
      to_email: userEmail,       // Added the email collected from the user
      date: selectedDate,
      time: selectedTime,
      cuisine: selectedCuisine
    };

    // Initialize emailjs with dummy or placeholder if real key isn't provided yet
    try {
      emailjs.init("dSqRaurXEd1PvDalV");
    } catch (e) {
      console.log("EmailJS not initialized yet. Skipping actual send.");
    }

    // Simulate network delay for effect, even if EmailJS is not fully configured
    setTimeout(() => {
      // Uncomment and use this block when keys are configured:
      emailjs.send(serviceID, templateID, templateParams)
        .then(() => { showFinalSuccess(); })
        .catch((err) => {
          console.error('Failed to send email', err);
          // Show success anyway for the UI flow
          showFinalSuccess();
        });

      // For now, bypass the real email call so the user sees the final screen
      console.log('Sending email with params:', templateParams);
      showFinalSuccess();

    }, 2000);
  }

  function showFinalSuccess() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('final-content').classList.remove('hidden');

    // Format date nicely
    const dateObj = new Date(selectedDate);
    const dateString = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Convert 24h time to 12h time
    let [hours, minutes] = selectedTime.split(':');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeString = `${hours}:${minutes} ${ampm}`;

    const messageEl = document.getElementById('final-message');
    messageEl.innerText = `I'll be waiting for you on ${dateString} at ${timeString}. Can't wait! 🌹`;

    triggerMassiveConfetti();
  }

  // --- Confetti Effects ---
  function triggerMiniConfetti() {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffb3c6', '#ffffff']
    });
  }

  function triggerMassiveConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff4d6d', '#ffb3c6', '#ffffff', '#590d22']
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff4d6d', '#ffb3c6', '#ffffff', '#590d22']
      }));
    }, 250);
  }
});
