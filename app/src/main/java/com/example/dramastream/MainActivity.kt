package com.example.dramastream

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.dramastream.ui.theme.DramaStreamTheme
import com.example.dramastream.ui.screens.HomeScreen
import com.example.dramastream.ui.screens.DetailScreen
import com.example.dramastream.ui.screens.PlayerScreen
import com.startapp.sdk.adsbase.StartAppAd
import com.startapp.sdk.adsbase.StartAppSDK

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize Start.io SDK with a numeric placeholder
        try {
            StartAppSDK.init(this, "200000000", true)
            StartAppAd.disableSplash()
        } catch (e: Exception) {
            e.printStackTrace()
        }

        setContent {
            DramaStreamTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") { 
            HomeScreen(onDramaClick = { dramaId -> 
                navController.navigate("detail/$dramaId") 
            }) 
        }
        composable("detail/{dramaId}") { backStackEntry ->
            val dramaId = backStackEntry.arguments?.getString("dramaId") ?: ""
            DetailScreen(
                dramaId = dramaId,
                onBack = { navController.popBackStack() },
                onEpisodeClick = { dramaId, epNum -> 
                    navController.navigate("player/$dramaId/$epNum")
                }
            )
        }
        composable("player/{dramaId}/{epNum}") { backStackEntry ->
            val dramaId = backStackEntry.arguments?.getString("dramaId") ?: ""
            val epNum = backStackEntry.arguments?.getString("epNum")?.toInt() ?: 1
            PlayerScreen(
                dramaId = dramaId,
                episodeNumber = epNum,
                onBack = { navController.popBackStack() }
            )
        }
    }
}
