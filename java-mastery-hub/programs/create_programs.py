#!/usr/bin/env python3
# Script to generate the complete programs page for Classes and Objects

programs_html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classes & Objects - Programs - Java Mastery Hub</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">☕</span>
                <span>Java Mastery Hub</span>
            </div>
        </div>
    </header>
    <div class="container">
        <div class="content-header">
            <h1>Classes & Objects - Code Examples</h1>
            <div class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <span>Programs</span>
                <span>/</span>
                <span>Classes & Objects</span>
            </div>
        </div>
        <div class="content-section">
            <h2>Hands-On Java Programs</h2>
            <p>Welcome to the practical section! These 14 programs demonstrate classes, objects, constructors, the 'this' keyword, and object references. Each program is heavily commented to explain concepts at multiple levels.</p>
            <div class="callout tip">
                <div class="callout-title">💡 TIP</div>
                <p>Try running these programs yourself! Experiment with creating different objects, modifying fields, and calling methods. Hands-on practice is essential for mastering OOP!</p>
            </div>
        </div>
'''

# Write to file
with open('classes-and-objects.html', 'w') as f:
    f.write(programs_html)

print("Base HTML created")
