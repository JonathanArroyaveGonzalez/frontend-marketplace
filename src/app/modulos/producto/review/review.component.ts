import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  enviarReview() {
    Swal.fire({
      title: '<strong>Deja tu reseña</strong>',
      html: `
        <style>
          /* Estilos para el rating */
          .rating {
  display: inline-block;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 50px;
}

.rating {
  display: inline-block;
  unicode-bidi: bidi-override;
  direction: rtl; 
}

.rating input {
  position: absolute;
  left: -9999px; 
}

.rating label {
  display: inline-block;
  font-size: 24px; 
  color: #ccc; 
  cursor: pointer;
}

.rating label:hover,
.rating label:hover ~ label,
.rating input:checked ~ label {
  color: gold; 
}


          /* Estilos para el textarea */
          textarea { width: 100%; padding: 10px; margin-bottom: 10px; box-sizing: border-box; }
        </style>

        <div class="rating">
          <input type="radio" name="rating" id="rating-5" value="5">
          <label for="rating-5">☆</label>
          <input type="radio" name="rating" id="rating-4" value="4">
          <label for="rating-4">☆</label>
          <input type="radio" name="rating" id="rating-3" value="3">
          <label for="rating-3">☆</label>
          <input type="radio" name="rating" id="rating-2" value="2">
          <label for="rating-2">☆</label>
          <input type="radio" name="rating" id="rating-1" value="1">
          <label for="rating-1">☆</label>
        </div>

        <textarea placeholder="Escribe tu comentario aquí"></textarea>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const ratingElement = document.querySelector(
          '.rating input[type="radio"]:checked'
        );
        const rating =
          ratingElement instanceof HTMLInputElement
            ? ratingElement.value
            : null;

        const comentario = document.querySelector('textarea')?.value;

        if (!rating) {
          Swal.showValidationMessage('Por favor, selecciona una calificación.');
          return false;
        }

        return { rating: parseInt(rating), comentario };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, comentario } = result.value;
        // Aquí puedes enviar el rating y el comentario a tu backend
        console.log('Rating:', rating);
        console.log('Comentario:', comentario);
      }
    });
  }
}
