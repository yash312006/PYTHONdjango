from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Post, Category

class PostTest(TestCase):
    def test_post_creation(self):
        cat = Category.objects.create(name="Test")
        post = Post.objects.create(
            title="Test Post",
            content="Test Content",
            category=cat
        )
        self.assertEqual(post.title, "Test Post")
