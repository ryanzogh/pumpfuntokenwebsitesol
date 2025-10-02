// Hauntkin Website JavaScript

// Create screen flash effect
function createScreenFlash() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    
    // Add multiple flashes for more dramatic effect
    setTimeout(() => {
        const flash2 = document.createElement('div');
        flash2.className = 'screen-flash';
        document.body.appendChild(flash2);
        
        setTimeout(() => {
            document.body.removeChild(flash2);
        }, 200);
    }, 100);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 500);
}

// Main loading sequence
function startLoadingSequence() {
    setTimeout(() => {
        // Hide loading screen
        document.getElementById('loadingScreen').classList.add('hidden');
        
        // Show jump animation with flash effect (no sound)
        const jumpScreen = document.getElementById('jumpScreen');
        jumpScreen.style.display = 'flex';
        
        // Just show the visual effect, no audio
        createScreenFlash();
        
        // Hide jump screen and show main content
        setTimeout(() => {
            jumpScreen.style.display = 'none';
            document.getElementById('mainContent').classList.add('visible');
        }, 800);
    }, 3000);
}

// Interactive card effects
function setupCardInteractions() {
    document.querySelectorAll('.tokenomics-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05) rotate(2deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
        });
    });
}

// Floating hauntkin click effects
function setupFloatingHauntkins() {
    document.querySelectorAll('.floating-hauntkin').forEach(hauntkin => {
        hauntkin.addEventListener('click', () => {
            // Just animate when clicked
            animateRandomPumpkin();
        });
    });
}

// Animate a random pumpkin with different effects
function animateRandomPumpkin() {
    const pumpkins = document.querySelectorAll('.floating-hauntkin');
    const animations = ['spin', 'bounce', 'pulse'];
    
    pumpkins.forEach(pumpkin => {
        // Remove any existing animation classes
        pumpkin.classList.remove('spin', 'bounce', 'pulse');
        
        // Add random animation
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        pumpkin.classList.add(randomAnimation);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            pumpkin.classList.remove(randomAnimation);
        }, 1000);
    });
}

// Parallax mouse effect
function setupParallaxEffect() {
    window.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating-hauntkin');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    startLoadingSequence();
    setupCardInteractions();
    setupFloatingHauntkins();
    setupParallaxEffect();
    setupCopyButton();
});

// Setup copy button functionality
function setupCopyButton() {
    const copyBtn = document.querySelector('.copy-btn');
    const caPlaceholder = document.querySelector('.ca-placeholder');
    
    if (copyBtn && caPlaceholder) {
        // Check if there's an actual contract address (not placeholder text)
        const contractText = caPlaceholder.textContent.trim();
        
        // Enable button if it's not the placeholder text
        if (contractText !== 'Coming Soon... 🎃') {
            copyBtn.disabled = false;
            copyBtn.style.opacity = '1';
            copyBtn.style.cursor = 'pointer';
        }
        
        copyBtn.addEventListener('click', async () => {
            if (copyBtn.disabled) return;
            
            try {
                // Copy the contract address to clipboard
                await navigator.clipboard.writeText(contractText);
                
                // Visual feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ Copied!';
                copyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = 'linear-gradient(45deg, #8a2be2, #4b0082)';
                }, 2000);
                
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = contractText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Visual feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ Copied!';
                copyBtn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = 'linear-gradient(45deg, #8a2be2, #4b0082)';
                }, 2000);
            }
        });
    }
}

// Function to update contract address (call this when you have the real CA)
function updateContractAddress(newAddress) {
    const caPlaceholder = document.querySelector('.ca-placeholder');
    const copyBtn = document.querySelector('.copy-btn');
    
    if (caPlaceholder && copyBtn) {
        caPlaceholder.textContent = newAddress;
        copyBtn.disabled = false;
        copyBtn.style.opacity = '1';
        copyBtn.style.cursor = 'pointer';
    }
}

// Website is now audio-free for cleaner experience
