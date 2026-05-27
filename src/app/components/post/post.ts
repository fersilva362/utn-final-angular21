import { Component, inject, signal } from '@angular/core';
import { Client } from '../../services/client';
import { PostModel } from '../../models/Post';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  private postService: Client = inject(Client);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  loadPost(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('error: err');
        this.error.set(err);
      },
    });
  }
  posts = signal<PostModel[]>([]);
  constructor() {
    this.loadPost();
  }
}
