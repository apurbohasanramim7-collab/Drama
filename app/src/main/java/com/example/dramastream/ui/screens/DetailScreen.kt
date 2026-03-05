package com.example.dramastream.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(dramaId: String, onBack: () -> Unit, onEpisodeClick: (String, Int) -> Unit) {
    val episodes = (1..20).toList()
    val freeLimit = 5

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Drama Details") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = null)
                    }
                },
                colors = TopAppBarDefaults.smallTopAppBarColors(containerColor = Color.Transparent)
            )
        }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding).fillMaxSize().background(Color(0xFF0A0502))) {
            item {
                Box(modifier = Modifier.fillMaxWidth().height(300.dp)) {
                    AsyncImage(
                        model = "https://picsum.photos/seed/$dramaId/800/600",
                        contentDescription = null,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                }
            }
            item {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("SYNOPSIS", color = MaterialTheme.colorScheme.primary, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    Text(
                        "This is a sample description for the drama. It involves a lot of mystery, romance, and exciting plot twists that will keep you on the edge of your seat.",
                        color = Color.LightGray,
                        fontSize = 14.sp
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                    Text("EPISODES", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                }
            }
            items(episodes) { epNum ->
                EpisodeItem(epNum, epNum <= freeLimit) {
                    onEpisodeClick(dramaId, epNum)
                }
            }
        }
    }
}

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@Composable
fun EpisodeItem(number: Int, isFree: Boolean, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp)
            .clip(RoundedCornerShape(12.dp)),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1614)),
        onClick = onClick
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(if (isFree) MaterialTheme.colorScheme.primary else Color.DarkGray),
                contentAlignment = Alignment.Center
            ) {
                if (isFree) {
                    Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                } else {
                    Icon(Icons.Default.Lock, contentDescription = null, tint = Color.LightGray)
                }
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text("Episode $number", color = Color.White, fontWeight = FontWeight.Bold)
                Text(if (isFree) "Free to watch" else "Watch ad to unlock", color = Color.Gray, fontSize = 10.sp)
            }
        }
    }
}
