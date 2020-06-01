#install.packages("remotes")
#remotes::install_github("apreshill/bakeoff")

# load libraries
library(bakeoff)

# export to csvg
write.csv(baker_results,"./data/baker_results.csv", row.names = FALSE)
write.csv(episode_results,"./data/episode_results.csv", row.names = FALSE)
write.csv(challenge_results,"./data/challenge_results.csv", row.names = FALSE)
write.csv(ratings_seasons,"./data/ratings_seasons.csv", row.names = FALSE)