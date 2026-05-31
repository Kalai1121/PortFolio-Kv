import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  email = "kalaivanibadhri@gmail.com"
  github = "https://github.com/kalai1121"
  linkedin = "https://www.linkedin.com/in/kalaivani-s-1121p/"
}
