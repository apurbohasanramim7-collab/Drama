package com.example.dramastream.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

data class Drama(
    val id: String,
    val title: String,
    val thumb: String,
    val category: String
)

@Composable
fun HomeScreen(onDramaClick: (String) -> Unit) {
    val mockDramas = listOf(
        Drama("1", "Secret Love", "https://picsum.photos/seed/d1/400/600", "Romance"),
        Drama("2", "Shadow Throne", "https://picsum.photos/seed/d2/400/600", "Historical"),
        Drama("3", "Cyber Heist", "https://picsum.photos/seed/d3/400/600", "Sci-Fi")
    )

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)
    ) {
        item {
            FeaturedHero(mockDramas[0], onDramaClick)
        }
        item {
            SectionTitle("Trending Now")
            LazyRow(contentPadding = PaddingValues(horizontal = 16.dp)) {
                items(mockDramas) { drama ->
                    DramaItem(drama, onDramaClick)
                }
            }
        }
        item {
            SectionTitle("New Releases")
            LazyRow(contentPadding = PaddingValues(horizontal = 16.dp)) {
                items(mockDramas.reversed()) { drama ->
                    DramaItem(drama, onDramaClick)
                }
            }
        }
    }
}

@Composable
fun FeaturedHero(drama: Drama, onClick: (String) -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(450.dp)
            .clickable { onClick(drama.id) }
    ) {
        AsyncImage(
            model = drama.thumb,
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(Color.Transparent, Color(0xFF0A0502)),
                        startY = 300f
                    )
                )
        )
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(24.dp)
        ) {
            Text(
                text = "FEATURED",
                color = MaterialTheme.colorScheme.primary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = drama.title.uppercase(),
                color = Color.White,
                fontSize = 42.sp,
                fontWeight = FontWeight.Black,
                lineHeight = 40.sp
            )
        }
    }
}

@Composable
fun DramaItem(drama: Drama, onClick: (String) -> Unit) {
    Column(
        modifier = Modifier
            .width(150.dp)
            .padding(end = 12.dp)
            .clickable { onClick(drama.id) }
    ) {
        AsyncImage(
            model = drama.thumb,
            contentDescription = null,
            modifier = Modifier
                .height(220.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp)),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(drama.title, color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
        Text(drama.category, color = Color.Gray, fontSize = 10.sp)
    }
}

@Composable
fun SectionTitle(title: String) {
    Text(
        text = title,
        color = Color.White,
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold,
        modifier = Modifier.padding(16.dp)
    )
}
