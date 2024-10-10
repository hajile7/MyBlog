function initializeBootstrapComponents() {
    var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
    var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new bootstrap.Offcanvas(offcanvasEl);
    });
}

// NavBar SubMenu

function initializeNavSubMenu() {
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.stopPropagation();  // Prevent closing the parent dropdown
            e.preventDefault();   // Prevent following the link

            // Hide any open submenus except the one that was clicked
            document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(function (submenu) {
                if (submenu !== element.nextElementSibling) {
                    submenu.style.display = 'none';
                }
            });

            // Toggle the clicked submenu visibility
            var submenu = this.nextElementSibling;
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });

    // Add event listener to close offcanvas navbar when a link is clicked
    document.querySelectorAll('.offcanvas a').forEach(function (link) {
        link.addEventListener('click', function () {
            // Check if the clicked link is a dropdown-toggle (submenu), if it is, don't close
            if (!this.classList.contains('dropdown-toggle')) {
                var offcanvasElement = document.querySelector('.offcanvas');
                var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvasInstance) {
                    offcanvasInstance.hide(); // Close the offcanvas when a non-submenu link is clicked
                }
            }
        });
    });
}

// Making OffCanvas Responsive

function toggleOffcanvasPosition(offcanvasId) {
    var offcanvasElement = document.getElementById(offcanvasId);

    if (window.matchMedia("(max-width: 640.98px)").matches) {
        // Small screens --> offcanvas-top
        offcanvasElement.classList.remove('offcanvas-start');
        offcanvasElement.classList.add('offcanvas-top');
    } else {
        // Large screens --> offcanvas-start
        offcanvasElement.classList.remove('offcanvas-top');
        offcanvasElement.classList.add('offcanvas-start');
    }
}

// Listen for resize
function addResizeEventForOffcanvas(offcanvasId) {
    function handleResize() {
        toggleOffcanvasPosition(offcanvasId);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
}