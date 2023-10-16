$(".carousel").owlCarousel({
	items:5
});


const initSlider = () => {
    const imageList = document.querySelector(".rd_slider-wrapper .rd_image-list");
    const slideButtons = document.querySelectorAll(".rd_slider-wrapper .rd_slide-button");
    const sliderScrollbar = document.querySelector(".roadmap_container .rd_slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".rd_scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

$(document).ready(function(){
	$(".insideBox2_inv").hide();
	$(document).on('click', ".read_more", function(){
		var moreLessBtn=$(".insideBox2_inv").is(":visible")?'READ MORE':'READ LESS';
		$(this).text(moreLessBtn);
		$(this).parent(".box").find(".insideBox2_inv").toggle();
		$(this).parent(".box").find(".insideBox2").toggle();
	});
});


function toggleTabs(id){
	$(".nav_tab").removeClass("active");
	$("#"+id).addClass("active");
	if(id=="activetab1"){
		$("#tab1").show();
		$("#tab2").hide();
		$("#tab3").hide();
	}
	else if(id=="activetab2"){
		$("#tab2").show();
		$("#tab1").hide();
		$("#tab3").hide();
	}
	else if(id=="activetab3"){
		$("#tab3").show();
		$("#tab2").hide();
		$("#tab1").hide();
	}
}

