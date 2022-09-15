---
title: "Computational biology postdoc: locality sensitive hashing for petabyte-scale metagenomic search"
date: 2022-05-06
categories:
 - jobs
tags:
 - jobs
 - containment MinHash
 - bloom filters
 - Locality sensitive hashing
 - pathogen monitoring
 - closed
published: true
header:
  teaser: "/assets/images/containment.jpg"
---

<script type="application/ld+json">
{
  "@context" : "https://schema.org/",
  "@type" : "JobPosting",
  "title" : "Postdoctoral Fellow in locality sensitive hashing for petabyte-scale metagenomic search",
  "description" : "<h1 id="scientific-challenge">Scientific Challenge</h1>
<p>TThe Sequence Read Archive (SRA) is a repository for the world's public
unassembled genomics data---currently ~40 Petabytes of data. There is not
currently a method of finding samples in SRA that contain reads similar to a
search sequence. SRA search would enable us to monitor sequences for pathogen
emergence, find novel gene homologs and more. One challenge with conventional
kmer search methods like minhash is that they perform poorly when the query is
small and the search set is large, for example when searching for a virus
genome in a metagenomic dataset. Containment search
[(Kosleki and Zabeti 2019)](https://doi.org/10.1016/j.amc.2019.02.018) and
FracMinHash [(Iber et al. 2022)](https://doi.org/10.1101/2022.01.11.475838)
provide a solution to searching uneven size datasets but a single containment hash search of a
dataset as large as SRA could take a day. This project will apply novel indexing
and search methods to enable fast containment search of SRA data. The work will
help the USDA monitor sequence data for plant and animal pathogens and
enable large-scale metagenomic search projects.</p>
<h1 id="position">Position</h1>
<p>This postdoc is with the U.S. Department of Agriculture (USDA), Agricultural Research Service (ARS), Genomics and Bioinformatics Research Unit in Gainesville, Florida. Other work locations are also possible. It is part of the SCINet/Big Data Fellows Program of the USDA ARS offers research opportunities to motivated postdoctoral fellows interested in working on agricultural-related problems at a range of spatial and temporal scales, from the genome to the continent, and sub-daily to evolutionary time scales. One of the goals of the SCINet Initiative is to develop and apply new technologies, including AI and machine learning, to help solve complex agricultural problems that also depend on collaboration across scientific disciplines and geographic locations. In addition, many of these technologies rely on the synthesis, integration, and analysis of large, diverse datasets that benefit from high performance computing clusters (HPC). The objective of this fellowship program is to facilitate cross-disciplinary, cross-location research through collaborative research on problems of interest to each applicant and amenable to or required by the HPC environment. Training will be provided in specific AI, machine learning, deep learning, and statistical software needed for a fellow to use the HPC to search and analyze large metagenomics datasets.</p>
<h1 id="usda-ars-contact">USDA-ARS Contact:</h1>
<p>If you have questions about the nature of the research, please contact Dr. Adam Rivers, adam.rivers@usda.gov. Lab web site https://tinyecology.com</p>
<p>Anticipated Appointment Start Date: Start date is flexible and will depend on a variety of factors.</p>
<h1 id="appointment-length">Appointment Length:</h1>
<p>The appointment will initially be for one year, but will be renewed upon recommendation of the mentor and ARS.</p>
<h1 id="level-of-participation">Level of Participation</h1>
<p>The appointment is full-time.</p>
<h1 id="participant-stipend">Participant Stipend</h1>
<p>The participant(s) will receive a monthly stipend commensurate with educational level and experience. The Stipend is approximately $90,000 per year plus a stipend for heath insurance through ORISE.</p>
<h1 id="citizenship-requirements">Citizenship Requirements</h1>
<p>This opportunity is currently available to U.S. citizens only.</p>
<h1 id="orise-information">ORISE Information</h1>
<p>This program, administered by ORAU through its contract with the U.S. Department of Energy (DOE) to manage the Oak Ridge Institute for Science and Education (ORISE), was established through an interagency agreement between DOE and ARS. Participants do not become employees of USDA, ARS, DOE or the program administrator, and there are no employment-related benefits. Proof of health insurance is required for participation in this program. Health insurance can be obtained through ORISE.</p>
<h1 id="preferred-skills">Preferred skills:</h1>
<ul>
  <li>Proficiency in Linux and Bash scripting</li>
  <li>Experience in Python or other languages</li>
  <li>Experience with Github and workflow managers like Nextflow</li>
  <li>Some experience with statistical modeling</li>
  <li>An interest in biological applications</li>
</ul>
<p>We recognize that everyone has a unique mix of skills and welcome applications from anyone who has an established track record of productivity in genomics or AI/ML research.</p>
<h2 id="eligibility-requirements">Eligibility Requirements</h2>
<ul>
  <li>Degree: Doctoral Degree.</li>
</ul>
<p>Interested? <a href="mailto:adam.rivers@usda.gov?Subject=lsh-postdoc-position">Email me today</a>  and <a href="https://www.zintellect.com/Opportunity/Details/USDA-ARS-2022-0131">apply here</a></p>

  ",
  "identifier": {
    "@type": "PropertyValue",
    "name": "USDA-ARS",
    "value": "000001"
  },
  "datePosted" : "2022-08-11",
  "validThrough" : "2022-09-30T00:00",
  "applicantLocationRequirements": {
    "@type": "Country",
    "name": "USA"
  },
  "eligibilityToWorkRequirement" : "U.S. citizens, Lawful Permanent Residents (LPR), and foreign nationals.",
  "jobLocation": {
  "@type": "Place",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2055 Mowry Road",
    "addressLocality": "Gainesville",
    "addressRegion": "FL",
    "postalCode": "32610",
    "addressCountry": "US"
  }
 },
  "employmentType": "FULL_TIME",
  "hiringOrganization" : {
    "@type" : "Organization",
    "name" : "United States Department of Agriculture, Agricultural Research Service",
    "sameAs" : "https://www.ars.usda.gov/",
    "logo" : "https://tinyecology.com/assets/USDALOGO-RGB.png"
  },
  "url": "https://www.zintellect.com/Opportunity/Details/USDA-ARS-2022-0131",
 "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": {
      "@type": "QuantitativeValue",
      "value": 90000,
      "unitText": "Year"
    }
  }
}
</script>

{% include figure image_path="/assets/images/containment.jpg" alt="Example of containment search" caption="Image from [(Kosleki and Zabeti 2019)](https://doi.org/10.1016/j.amc.2019.02.018)" %}



This position is open until 9/30/2022 applications will be evaluated as soon as they are recieved.
{: .notice--warning}

# Scientific Challenge

The Sequence Read Archive (SRA) is a repository for the world's public
unassembled genomics data---currently ~40 Petabytes of data. There is not
currently a method of finding samples in SRA that contain reads similar to a
search sequence. SRA search would enable us to monitor sequences for pathogen
emergence, find novel gene homologs and more. One challenge with conventional
kmer search methods like minhash is that they perform poorly when the query is
small and the search set is large, for example when searching for a virus
genome in a metagenomic dataset. Containment search
[(Kosleki and Zabeti 2019)](https://doi.org/10.1016/j.amc.2019.02.018) and
FracMinHash [(Iber et al. 2022)](https://doi.org/10.1101/2022.01.11.475838)
provide a solution to searching uneven size datasets but a single containment hash search of a
dataset as large as SRA could take a day. This project will apply novel indexing
and search methods to enable fast containment search of SRA data. The work will
help the USDA monitor sequence data for plant and animal pathogens and
enable large-scale metagenomic search projects.   

# Position

This postdoc is with the U.S. Department of Agriculture (USDA), Agricultural
Research Service (ARS), Genomics and Bioinformatics Research Unit in
Gainesville, Florida. Other work locations are also possible. It is part of the
SCINet/Big Data Fellows Program of the USDA ARS offers research opportunities to
motivated postdoctoral fellows interested in working on agricultural-related
problems at a range of spatial and temporal scales, from the genome to the
continent, and sub-daily to evolutionary time scales. One of the goals of the
SCINet Initiative is to develop and apply new technologies, including AI and
machine learning, to help solve complex agricultural problems that also depend
on collaboration across scientific disciplines and geographic locations. In
addition, many of these technologies rely on the synthesis, integration, and
analysis of large, diverse datasets that benefit from high performance computing
clusters (HPC). The objective of this fellowship program is to facilitate
cross-disciplinary, cross-location research through collaborative research on
problems of interest to each applicant and amenable to or required by the HPC
environment. Training will be provided in specific AI, machine learning, deep
learning, and statistical software needed for a fellow to use the HPC to search
and analyze large metagenomics datasets.



# USDA-ARS Contact:

If you have questions about the nature of the research, please contact Dr. Adam Rivers, adam.rivers@usda.gov. Lab web site [https://tinyecology.com](https://tinyecology.com).

# Anticipated Appointment Start Date:

Start date is flexible.

# Appointment Length:

The appointment will initially be for one year, but will be renewed upon recommendation of the mentor and ARS.

# Level of Participation

The appointment is full-time.

# Participant Stipend

The participant(s) will receive a monthly stipend commensurate with educational level and experience. The stipend is approximately $90,000 per year plus a stipend for health insurance through ORISE.

# Citizenship Requirements

This opportunity is available to U.S. citizens, Lawful Permanent Residents (LPR), and foreign nationals.

# ORISE Information

This program, administered by ORAU through its contract with the U.S. Department of Energy (DOE) to manage the Oak Ridge Institute for Science and Education (ORISE), was established through an interagency agreement between DOE and ARS. Participants do not become employees of USDA, ARS, DOE or the program administrator, and there are no employment-related benefits. Proof of health insurance is required for participation in this program. Health insurance can be obtained through ORISE.


# Preferred skills:

*	Proficiency in Linux and Bash scripting
*	Experience in Python or other languages
*	Experience with Github and workflow managers like Nextflow
*	Some experience with statistical modeling
*	An interest in biological applications

We recognize that everyone has a unique mix of skills and welcome applications from anyone who has an established track record of productivity in genomics or AI/ML research.

##  Eligibility Requirements

*	Degree: Doctoral Degree.

## Location

The position is located in Gainesville, FL at the USDA Agricultural Research Service lab and the
 University of Florida Emerging Pathogens Institute. ORISE may approve US remote work.


Interested? [Email me today](mailto:adam.rivers@usda.gov?Subject=lsh-postdoc-position)  and [apply here](https://www.zintellect.com/Opportunity/Details/USDA-ARS-2022-0131).
