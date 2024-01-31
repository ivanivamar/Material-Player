import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import jDataView from 'jdataview';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
    title = 'MaterialMusicPlayer';

    onFileSelected(event: any) {
        var reader = new FileReader();

        reader.onload = function(event) {
            if (typeof this.result === 'string') {
                let view = new jDataView(this.result);

                // "TAG" starts at byte -128 from EOF.
                if (view.getString(3, view.byteLength - 128) == 'TAG') {
                    var title = view.getString(30, view.tell());
                    var artist = view.getString(30, view.tell());
                    var album = view.getString(30, view.tell());
                    var year = view.getString(4, view.tell());
                    console.log('Title: ' + title + ' Artist: ' + artist + ' Album: ' + album + ' Year: ' + year);
                }
            } else {
                // Handle the case when this.result is null
                // You might want to initialize it with a default value or throw an error
            }
        }
    }
}
