# Portfolio Content Update Guide

This portfolio uses a strictly separated **data architecture**. This means you do not need to search through React components (`.tsx` files) to change your personal information. 

All of your content is stored in the `src/data/` folder as plain text and lists.

To insert your real professional information, locate the corresponding file below and replace the `[BRACKETED PLACEHOLDER]` text with your actual content.

---

## 1. Professional Introduction
**File:** `src/data/about.ts`

**What to add:**
- Your professional headline/statement.
- Your primary technical bio.
- Location and Availability metadata.

---

## 2. Professional Experience
**File:** `src/data/experience.ts`

**What to add:**
- For each job, add the Company, Role, and Dates.
- Write a short description of your responsibilities.
- Provide a list of key contributions/metrics as bullet points.
- Provide a list of technologies used for each role.

*Note: You can add as many roles as you want by copying the object structure `{ ... }`.*

---

## 3. Skills & Capabilities
**File:** `src/data/skills.ts`

**What to add:**
- Group your skills logically (e.g., Frontend, Backend, DevOps, Tools).
- For each category, provide a short description of your focus.
- Add an array of the specific technologies you master.

---

## 4. Education
**File:** `src/data/education.ts`

**What to add:**
- Your Institution, Degree, and Field of study.
- The years attended.
- (Optional) A short description regarding thesis, honors, etc.

---

## 5. Engineering Philosophy
**File:** `src/data/philosophy.ts`

**What to add:**
- 3 to 5 single powerful words that define your engineering approach (e.g., "PERFORMANCE", "CRAFT").
- (Optional) A short 1-sentence statement explaining what that word means to you.

---

### Instructions for Editing
1. Open the file in your code editor (e.g., VSCode).
2. Look for the `[REPLACE THIS]` comments.
3. Change the string values between the quotes `""`. 
4. Save the file. The portfolio will automatically update in your browser.
