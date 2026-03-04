package com.example.dramastream.ui.screens

import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.startapp.sdk.adsbase.StartAppAd
import com.startapp.sdk.adsbase.adlisteners.AdEventListener
import com.startapp.sdk.adsbase.adlisteners.VideoListener

@Composable
fun PlayerScreen(dramaId: String, episodeNumber: Int, onBack: () -> Unit) {
    var isUnlocked by remember { mutableStateOf(episodeNumber <= 5) }
    var isAdLoading by remember { mutableStateOf(false) }

    Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
        if (isUnlocked) {
            VideoPlayer("https://www.youtube.com/embed/dQw4w9WgXcQ") // Blogger URL placeholder
        } else {
            UnlockOverlay(
                onUnlockClick = {
                    isAdLoading = true
                    // In real app, call StartApp Rewarded Ad here
                    // For demo, we simulate unlock
                    isUnlocked = true
                    isAdLoading = false
                }
            )
        }

        IconButton(
            onClick = onBack,
            modifier = Modifier.padding(16.dp).background(Color.Black.copy(alpha = 0.5f))
        ) {
            Icon(Icons.Default.ArrowBack, contentDescription = null, tint = Color.White)
        }
    }
}

@Composable
fun VideoPlayer(url: String) {
    AndroidView(
        factory = { context ->
            WebView(context).apply {
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                webViewClient = WebViewClient()
                loadUrl(url)
            }
        },
        modifier = Modifier.fillMaxSize()
    )
}

@Composable
fun UnlockOverlay(onUnlockClick: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Icon(Icons.Default.Lock, contentDescription = null, modifier = Modifier.size(64.dp), tint = Color.Gray)
        Spacer(modifier = Modifier.height(16.dp))
        Text("Episode Locked", color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Text("Watch a short ad to unlock this episode", color = Color.Gray, fontSize = 14.sp)
        Spacer(modifier = Modifier.height(32.dp))
        Button(
            onClick = onUnlockClick,
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
        ) {
            Icon(Icons.Default.PlayArrow, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("WATCH AD TO UNLOCK")
        }
    }
}
