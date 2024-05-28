import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
	@ViewChild('sidebar') sidebar!: ElementRef;

	openSidebar(): void {
		this.sidebar.nativeElement.classList.remove('ocultar-sidebar');
  	}

	closeSidebar(): void {
    	this.sidebar.nativeElement.classList.add('ocultar-sidebar');
  	}
}
