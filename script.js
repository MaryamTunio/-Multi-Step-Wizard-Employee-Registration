// /* ── State ── */
// let currentStep = 1;
// const TOTAL = 4;

// /* ── Validation rules ── */
// const rules = {
//   fullName:    v => v.trim().length >= 2,
//   dob:         v => {
//     if (!v) return false;
//     const age = (Date.now() - new Date(v)) / (365.25 * 24 * 3600 * 1000);
//     return age >= 18;
//   },
//   gender:      v => v !== '',
//   nationality: v => v.trim().length >= 2,
//   email:       v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
//   phone:       v => /^\+?[\d\s\-()]{10,15}$/.test(v.replace(/\s/g, '')),
//   street:      v => v.trim().length >= 3,
//   city:        v => v.trim().length >= 2,
//   zip:         v => v.trim().length >= 3,
//   ecName:      v => v.trim().length >= 2,
//   ecRel:       v => v !== '',
//   ecPhone:     v => /^\+?[\d\s\-()]{10,15}$/.test(v.replace(/\s/g, '')),
//   ecEmail:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
//   dept:        v => v !== '',
//   startDate:   v => v !== ''
// };

// /* fields per step */
// const stepFields = {
//   1: ['fullName', 'dob', 'gender', 'nationality'],
//   2: ['email', 'phone', 'street', 'city', 'zip'],
//   3: ['ecName', 'ecRel', 'ecPhone', 'ecEmail'],
//   4: ['dept', 'startDate']
// };

// /* ── Helpers ── */
// function val(id) {
//   const el = document.getElementById(id);
//   return el ? el.value : '';
// }

// function radioVal(name) {
//   const el = document.querySelector(`input[name="${name}"]:checked`);
//   return el ? el.value : '';
// }

// function validateField(id) {
//   const rule = rules[id];
//   if (!rule) return true;
//   const ok = rule(val(id));
//   const inp = document.getElementById(id);
//   const err = document.getElementById('e-' + id);
//   if (inp) inp.classList.toggle('error', !ok);
//   if (err) err.classList.toggle('show', !ok);
//   return ok;
// }

// function validateRadio(name, errId) {
//   const ok = !!document.querySelector(`input[name="${name}"]:checked`);
//   const err = document.getElementById(errId);
//   if (err) err.classList.toggle('show', !ok);
//   return ok;
// }

// function validateStep(n) {
//   let ok = true;
//   (stepFields[n] || []).forEach(id => { if (!validateField(id)) ok = false; });
//   if (n === 4) {
//     if (!validateRadio('empType',  'e-empType'))  ok = false;
//     if (!validateRadio('workPref', 'e-workPref')) ok = false;
//   }
//   return ok;
// }

// /* ── Stepper update ── */
// function updateStepper() {
//   for (let i = 1; i <= TOTAL; i++) {
//     const circle  = document.getElementById('sc' + i);
//     const wrapper = document.getElementById('sw' + i);
//     const line    = document.getElementById('sl' + i);

//     circle.classList.remove('active', 'done');
//     wrapper.classList.remove('active', 'done');

//     if (i < currentStep) {
//       circle.classList.add('done');
//       wrapper.classList.add('done');
//       circle.innerHTML = '✓';
//       if (line) line.classList.add('done');
//     } else if (i === currentStep) {
//       circle.classList.add('active');
//       wrapper.classList.add('active');
//       circle.innerHTML = i;
//       if (line) line.classList.remove('done');
//     } else {
//       circle.innerHTML = i;
//       if (line) line.classList.remove('done');
//     }
//   }

//   document.getElementById('stepCounter').textContent = `Step ${currentStep} of ${TOTAL}`;
//   const back = document.getElementById('backBtn');
//   const next = document.getElementById('nextBtn');
//   back.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
//   next.textContent = currentStep === TOTAL ? 'Submit ✓' : 'Next →';
// }

// /* ── Navigation ── */
// function navigate(dir) {
//   if (dir === 1) {
//     if (!validateStep(currentStep)) return;
//     if (currentStep === TOTAL) { submitForm(); return; }
//     currentStep++;
//   } else {
//     currentStep = Math.max(1, currentStep - 1);
//   }

//   for (let i = 1; i <= TOTAL; i++) {
//     document.getElementById('step' + i).classList.toggle('active', i === currentStep);
//   }
//   updateStepper();
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// /* ── Submit ── */
// function submitForm() {
//   const data = {
//     personalDetails: {
//       fullName:    val('fullName'),
//       dateOfBirth: val('dob'),
//       gender:      val('gender'),
//       nationality: val('nationality')
//     },
//     contactInfo: {
//       email:    val('email'),
//       phone:    val('phone'),
//       street:   val('street'),
//       city:     val('city'),
//       zip:      val('zip'),
//       linkedin: val('linkedin')
//     },
//     emergencyContact: {
//       name:         val('ecName'),
//       relationship: val('ecRel'),
//       phone:        val('ecPhone'),
//       email:        val('ecEmail')
//     },
//     rolePreferences: {
//       department:      val('dept'),
//       startDate:       val('startDate'),
//       employmentType:  radioVal('empType'),
//       workPreference:  radioVal('workPref'),
//       bio:             val('bio')
//     }
//   };

//   console.log('[Employee Registration] Submitted data:', data);

//   /* Hide form steps & nav */
//   for (let i = 1; i <= TOTAL; i++)
//     document.getElementById('step' + i).classList.remove('active');
//   document.getElementById('stepper').style.display  = 'none';
//   document.getElementById('navBar').style.display   = 'none';

//   /* Build summary */
//   const items = [
//     ['Name',            data.personalDetails.fullName],
//     ['Email',           data.contactInfo.email],
//     ['Department',      data.rolePreferences.department],
//     ['Start date',      data.rolePreferences.startDate],
//     ['Employment type', data.rolePreferences.employmentType],
//     ['Work preference', data.rolePreferences.workPreference]
//   ];

//   document.getElementById('summaryGrid').innerHTML = items
//     .map(([label, value]) => `
//       <div class="summary-item">
//         <label>${label}</label>
//         <p>${value || '—'}</p>
//       </div>`)
//     .join('');

//   document.getElementById('successScreen').style.display = 'block';
// }

// /* ── Restart ── */
// function restart() {
//   currentStep = 1;

//   /* Reset all inputs */
//   document.querySelectorAll('input:not([type=radio]):not([type=file]), select, textarea')
//     .forEach(el => el.value = '');
//   document.querySelectorAll('input[type=radio]').forEach(el => {
//     el.checked = false;
//     el.closest('.radio-option').classList.remove('checked');
//   });
//   document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
//   document.querySelectorAll('.err-msg').forEach(el => el.classList.remove('show'));
//   document.getElementById('bioCount').textContent = '0 / 300';

//   /* Show form again */
//   document.getElementById('stepper').style.display      = '';
//   document.getElementById('navBar').style.display       = '';
//   document.getElementById('successScreen').style.display = 'none';
//   document.getElementById('step1').classList.add('active');

//   updateStepper();
// }

// /* ── Real-time blur validation ── */
// Object.keys(rules).forEach(id => {
//   const el = document.getElementById(id);
//   if (el) el.addEventListener('blur', () => validateField(id));
// });

// /* ── Radio option highlight ── */
// document.querySelectorAll('.radio-option input[type=radio]').forEach(radio => {
//   radio.addEventListener('change', function () {
//     const group = this.closest('.radio-group');
//     group.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('checked'));
//     this.closest('.radio-option').classList.add('checked');
//     /* clear error */
//     const errId = 'e-' + this.name;
//     const err = document.getElementById(errId);
//     if (err) err.classList.remove('show');
//   });
// });

// /* ── Bio character counter ── */
// document.getElementById('bio').addEventListener('input', function () {
//   const len = this.value.length;
//   const counter = document.getElementById('bioCount');
//   counter.textContent = `${len} / 300`;
//   counter.classList.toggle('warn', len > 240 && len < 280);
//   counter.classList.toggle('max',  len >= 280);
// });

// /* ── Init ── */
// updateStepper();




// script.js
/* ── State ── */
let currentStep = 1;
const TOTAL = 4;

/* ── Initialize International Phone Inputs (With Auto IP Lookup) ── */
const geoLookupFn = function(success, failure) {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => success(data.country_code))
    .catch(() => success("us"));
};

const phoneInputEl = document.querySelector("#phone");
const ecPhoneInputEl = document.querySelector("#ecPhone");

const itiPhone = window.intlTelInput(phoneInputEl, {
  initialCountry: "auto", 
  geoIpLookup: geoLookupFn,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
});

const itiEcPhone = window.intlTelInput(ecPhoneInputEl, {
  initialCountry: "auto",
  geoIpLookup: geoLookupFn,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
});

/* ── Validation rules ── */
const rules = {
  fullName:    v => v.trim().length >= 2,
  dob:         v => {
    if (!v) return false;
    const age = (Date.now() - new Date(v)) / (365.25 * 24 * 3600 * 1000);
    return age >= 18;
  },
  gender:      v => v !== '',
  nationality: v => v.trim().length >= 2,
  email:       v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  // UPDATED: Plugs your instance directly into the internal library validator
  phone:       () => itiPhone.isValidNumber(),
  street:      v => v.trim().length >= 3,
  city:        v => v.trim().length >= 2,
  zip:         v => v.trim().length >= 3,
  ecName:      v => v.trim().length >= 2,
  ecRel:       v => v !== '',
  // UPDATED: Plugs your emergency instance into the internal library validator
  ecPhone:     () => itiEcPhone.isValidNumber(),
  ecEmail:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  dept:        v => v !== '',
  startDate:   v => v !== ''
};

/* fields per step */
const stepFields = {
  1: ['fullName', 'dob', 'gender', 'nationality'],
  2: ['email', 'phone', 'street', 'city', 'zip'],
  3: ['ecName', 'ecRel', 'ecPhone', 'ecEmail'],
  4: ['dept', 'startDate']
};

/* ── Helpers ── */
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function radioVal(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '';
}

function validateField(id) {
  const rule = rules[id];
  if (!rule) return true;
  const ok = rule(val(id));
  const inp = document.getElementById(id);
  const err = document.getElementById('e-' + id);
  if (inp) inp.classList.toggle('error', !ok);
  if (err) err.classList.toggle('show', !ok);
  return ok;
}

function validateRadio(name, errId) {
  const ok = !!document.querySelector(`input[name="${name}"]:checked`);
  const err = document.getElementById(errId);
  if (err) err.classList.toggle('show', !ok);
  return ok;
}

function validateStep(n) {
  let ok = true;
  (stepFields[n] || []).forEach(id => { if (!validateField(id)) ok = false; });
  if (n === 4) {
    if (!validateRadio('empType',  'e-empType'))  ok = false;
    if (!validateRadio('workPref', 'e-workPref')) ok = false;
  }
  return ok;
}

/* ── Stepper update ── */
function updateStepper() {
  for (let i = 1; i <= TOTAL; i++) {
    const circle  = document.getElementById('sc' + i);
    const wrapper = document.getElementById('sw' + i);
    const line    = document.getElementById('sl' + i);

    circle.classList.remove('active', 'done');
    wrapper.classList.remove('active', 'done');

    if (i < currentStep) {
      circle.classList.add('done');
      wrapper.classList.add('done');
      circle.innerHTML = '✓';
      if (line) line.classList.add('done');
    } else if (i === currentStep) {
      circle.classList.add('active');
      wrapper.classList.add('active');
      circle.innerHTML = i;
      if (line) line.classList.remove('done');
    } else {
      circle.innerHTML = i;
      if (line) line.classList.remove('done');
    }
  }

  document.getElementById('stepCounter').textContent = `Step ${currentStep} of ${TOTAL}`;
  const back = document.getElementById('backBtn');
  const next = document.getElementById('nextBtn');
  back.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
  next.textContent = currentStep === TOTAL ? 'Submit ✓' : 'Next →';
}

/* ── Navigation ── */
function navigate(dir) {
  if (dir === 1) {
    if (!validateStep(currentStep)) return;
    if (currentStep === TOTAL) { submitForm(); return; }
    currentStep++;
  } else {
    currentStep = Math.max(1, currentStep - 1);
  }

  for (let i = 1; i <= TOTAL; i++) {
    document.getElementById('step' + i).classList.toggle('active', i === currentStep);
  }
  updateStepper();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Submit ── */
function submitForm() {
  const data = {
    personalDetails: {
      fullName:    val('fullName'),
      dateOfBirth: val('dob'),
      gender:      val('gender'),
      nationality: val('nationality')
    },
    contactInfo: {
      email:    val('email'),
      // UPDATED: extracts clean, full international format (e.g., +923001234567)
      phone:    itiPhone.getNumber(), 
      street:   val('street'),
      city:     val('city'),
      zip:      val('zip'),
      linkedin: val('linkedin')
    },
    emergencyContact: {
      name:         val('ecName'),
      relationship: val('ecRel'),
      // UPDATED: extracts clean, full international format
      phone:        itiEcPhone.getNumber(), 
      email:        val('ecEmail')
    },
    rolePreferences: {
      department:      val('dept'),
      startDate:       val('startDate'),
      employmentType:  radioVal('empType'),
      workPreference:  radioVal('workPref'),
      bio:             val('bio')
    }
  };

  console.log('[Employee Registration] Submitted data:', data);

  /* Hide form steps & nav */
  for (let i = 1; i <= TOTAL; i++)
    document.getElementById('step' + i).classList.remove('active');
  document.getElementById('stepper').style.display  = 'none';
  document.getElementById('navBar').style.display   = 'none';

  /* Build summary */
  const items = [
    ['Name',            data.personalDetails.fullName],
    ['Email',           data.contactInfo.email],
    ['Phone',           data.contactInfo.phone],
    ['Department',      data.rolePreferences.department],
    ['Start date',      data.rolePreferences.startDate],
    ['Employment type', data.rolePreferences.employmentType],
    ['Work preference', data.rolePreferences.workPreference]
  ];

  document.getElementById('summaryGrid').innerHTML = items
    .map(([label, value]) => `
      <div class="summary-item">
        <label>${label}</label>
        <p>${value || '—'}</p>
      </div>`)
    .join('');

  document.getElementById('successScreen').style.display = 'block';
}

/* ── Restart ── */
function restart() {
  currentStep = 1;

  /* Reset all inputs */
  document.querySelectorAll('input:not([type=radio]):not([type=file]), select, textarea')
    .forEach(el => el.value = '');
  document.querySelectorAll('input[type=radio]').forEach(el => {
    el.checked = false;
    el.closest('.radio-option').classList.remove('checked');
  });
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.err-msg').forEach(el => el.classList.remove('show'));
  document.getElementById('bioCount').textContent = '0 / 300';

  /* Show form again */
  document.getElementById('stepper').style.display      = '';
  document.getElementById('navBar').style.display       = '';
  document.getElementById('successScreen').style.display = 'none';
  document.getElementById('step1').classList.add('active');

  updateStepper();
}

/* ── Real-time blur validation ── */
Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('blur', () => validateField(id));
});

/* ── Radio option highlight ── */
document.querySelectorAll('.radio-option input[type=radio]').forEach(radio => {
  radio.addEventListener('change', function () {
    const group = this.closest('.radio-group');
    group.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('checked'));
    this.closest('.radio-option').classList.add('checked');
    /* clear error */
    const errId = 'e-' + this.name;
    const err = document.getElementById(errId);
    if (err) err.classList.remove('show');
  });
});

/* ── Bio character counter ── */
document.getElementById('bio').addEventListener('input', function () {
  const len = this.value.length;
  const counter = document.getElementById('bioCount');
  counter.textContent = `${len} / 300`;
  counter.classList.toggle('warn', len > 240 && len < 280);
  counter.classList.toggle('max',  len >= 280);
});

/* ── Init ── */
updateStepper();