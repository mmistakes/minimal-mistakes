################################################################################
#                                                                              #
# Purpose:       Matrix journal new layout plots                               #
#                                                                              #
# Author:        Bruno P. Santos                                               #
# Contact:       bruno.ps@dcc.ufmg.br                                          #
# Client:        Bruno P. Santos                                               #
#                                                                              #
# Code created:  2017-09-06                                                    #
# Last updated:  2017-09-06                                                    #
# Source:        /home/bruno                                                   #
#                                                                              #
# Comment:       Script R created to rebuild the matrix journal graphics.      #
#                                                                              #
################################################################################

# library("commentr")
# header_comment(
#   title = "Matrix journal new layout plots",
#   description = "Script R created to rebuild the matrix journal graphics.",
#   author = "Bruno P. Santos",
#   contact = "bruno.ps@dcc.ufmg.br"
#   )


################################## Libraries ###################################

library(ggplot2)
library(gridExtra)
library(ggthemes)
library(stringr)
library(dplyr)
library(tidyr)
library(plyr)
library(reshape2)
library(ggthemr)
#devtools::install_github('cttobin/ggthemr')

############################### Choosing a theme ###############################
# https://github.com/cttobin/ggthemr#usage
# themename = "flat"
themename = "fresh"
# ggthemr(themename, spacing = 1, type = 'inner')
ggthemr(themename, spacing = 1)
#ggthemr_reset()

################################# IMG settings #################################
IMG_height = 3
IMG_width = 4

############################# Routing table usage ##############################


# MATRIX = read.csv('./data/matrix.csv', header = F) 
# MHCL = read.csv('./data/mhcl.csv', header = F) 
# XCTP = read.csv('./data/xctp.csv', header = F) 
# RPL = read.csv('./data/rpl.csv', header = F) 
# 
# routing_t_usage = cbind(MATRIX, MHCL, XCTP, RPL)
# colnames(routing_t_usage) = c('MATRIX', "MHCL", "XCTP", "RPL")
# 
# write.csv(routing_t_usage, './data/routing-table-usage.csv', quote = FALSE, row.names = FALSE)


t_usage = read.csv("./data/routing-table-usage.csv")

max_routes = 20

### CDF

t_usage_gathered = tidyr::gather(t_usage)
t_usage_gathered$value = 100 * (t_usage_gathered$value / max_routes)

cdf_t_usage_plot <- ggplot(t_usage_gathered, aes(x = value, colour=key, linetype = key)) +
  stat_ecdf(geom = "step", size = 1) +
  #scale_fill_discrete(name = "") +
  #scale_linetype_discrete(name = "") +
  #scale_color_discrete(name = "") +
  # scale_color_manual(name="", values = swatch()[2:3]) +
  theme(legend.position="top", legend.title = element_blank(),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm')) +
  #theme(panel.grid.minor = element_line(colour = "gray", linetype = "dotted")) +   theme(axis.text = element_text(size = 12), axis.title = element_text(size = 13)) +
  theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "Routing table usage (%)", y = bquote('CDF nodes (%)'))

cdf_t_usage_plot

ggsave(filename = "./imgs/new-cdf-t-usage.png",
       plot = cdf_t_usage_plot, device = "png",  width = IMG_width, height = IMG_height, scale = 1.4)


### CCDF 
matrix_data = 100 * t_usage$MATRIX/max_routes
mhcl_data = 100 * t_usage$MHCL/max_routes
xctp_data = 100 * t_usage$XCTP/max_routes
rpl_data = 100 * t_usage$RPL/max_routes

matrix_ecdf <- ecdf(matrix_data)
matrix_ccdf = data.frame(x = sort(matrix_data),
                         y = 1 - matrix_ecdf(sort(matrix_data)))
matrix_ccdf$protocol = 'MATRIX'

mhcl_ecdf <- ecdf(mhcl_data)
mhcl_ccdf = data.frame(x = sort(mhcl_data),
                         y = 1 - mhcl_ecdf(sort(mhcl_data)))
mhcl_ccdf$protocol = 'MHCL'

xctp_ecdf <- ecdf(xctp_data)
xctp_ccdf = data.frame(x = sort(xctp_data),
                         y = 1 - xctp_ecdf(sort(xctp_data)))
xctp_ccdf$protocol = 'XCTP'

rpl_ecdf <- ecdf(rpl_data)
rpl_ccdf = data.frame(x = sort(rpl_data),
                         y = 1 - rpl_ecdf(sort(rpl_data)))
rpl_ccdf$protocol = 'RPL'

ccdf_data = rbind(matrix_ccdf, mhcl_ccdf, xctp_ccdf, rpl_ccdf)

ccdf_t_usage_plot = ggplot(data=ccdf_data, aes(x = x,y = y, colour = protocol, shape = protocol, linetype = protocol)) +
  geom_line() +
  geom_point(size = 2.5, alpha = .6) +
  scale_colour_discrete(limits = c('XCTP', 'MHCL', 'MATRIX', 'RPL')) +
  scale_shape_discrete(limits = c('XCTP', 'MHCL', 'MATRIX', 'RPL')) +
  scale_linetype_discrete(limits = c('XCTP', 'MHCL', 'MATRIX', 'RPL')) +
  theme(legend.position = 'top',
        legend.title = element_blank(),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7, size = 12),
        axis.text.y = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  labs(x = "% routing table usage", y = "CCDF nodes")


ccdf_t_usage_plot

ggsave(filename = "./imgs/new-ccdf-t-usage.png",
       plot = ccdf_t_usage_plot, device = "png",  width = IMG_width, height = IMG_height, scale = 1.4)


################################### BEACONS ####################################

beacons_data = read.csv("./data/beacons.csv")

beacons_data$y_facet = factor(beacons_data$y_facet, levels(beacons_data$y_facet)[c(4,2,3,1)])
beacons_data$x_facet = factor(beacons_data$x_facet, levels(beacons_data$x_facet)[c(4,3,2,1)])
beacons_static = beacons_data %>% dplyr::filter(x_facet == 'Static')
beacons_without_static = beacons_data %>% dplyr::filter(x_facet != 'Static')

p = ggplot(beacons_without_static, aes(x = protocol, y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .65) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('CTP', 'XCTP', 'MATRIX', 'RPL')) +
  theme(legend.position="none",
        # strip.text = element_text(size = 12, family = 'Arial'),
        strip.background = element_rect(colour="#E5E5E5", fill="#E5E5E5"),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = expression('Number of Beacons'))

p = p + facet_grid(x_facet ~ y_facet)
p


ggsave(filename = "./imgs/new-beacons-scn-2-to-10-grid.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 2)



p = ggplot(beacons_static, aes(x = factor(protocol), y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .55) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('CTP', 'XCTP', 'MATRIX', 'RPL')) +
  ggtitle('Static scenario') +
  theme(legend.position="none",
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = expression('Number of Beacons'))
p
ggsave(filename = "./imgs/new-beacons-scn-1-static.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 1.4)



################################### RAM/ROM ####################################

### Data in Kb
ram_rom_data = read.csv('./data/memory-footprint.csv')


p = ggplot(ram_rom_data, aes(x = factor(protocol), y = usage, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7) +
  geom_text(aes(x= factor(protocol), y = usage, label= usage),vjust=0) +
  scale_y_continuous(limits = c(0, 50)) +
  scale_x_discrete(limits = c('CTP', 'XCTP', 'MATRIX', 'RPL')) +
  theme(legend.position="top", 
        legend.title = element_blank(),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "Protocols", y = 'Code and memory footprint (Kb)')

p + facet_grid(memory_type ~ .)
p


### Circular version (Kb)

ram = ram_rom_data %>% dplyr::filter(memory_type == 'RAM')
rom = ram_rom_data %>% dplyr::filter(memory_type == 'ROM')

ram_plot = ggplot(ram, aes(x = factor(protocol), y = usage, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .85, alpha = .65) +
  coord_polar(theta = 'y') +
  geom_text(aes(x= factor(protocol), y = usage, label= usage),
            vjust=c(1.5,1.7,1.9,-.7),
            hjust=c(.45,.2,.1,1)) +
  scale_y_continuous(limits = c(0, 10)) +
  scale_x_discrete(limits = c('CTP', 'XCTP', 'MATRIX', 'RPL')) +
  theme(legend.position = 'none',
        axis.title.y = element_text(margin = unit(c(0,0,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "Protocols", y = 'RAM memory footprint (Kb)')

ram_plot

ggsave(filename = "./imgs/new-ram-usage.png",
       plot = ram_plot, device = "png", width = 2.8, height = 2.5, scale = 1.4)


rom_plot = ggplot(rom, aes(x = factor(protocol), y = usage, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .85, alpha = .65) +
  coord_polar(theta = 'y') +
  geom_text(aes(x= factor(protocol), y = usage, label= round(usage, digits = 1)), 
            vjust=c(1.2,1.2,.8,-.9), hjust = c(1.1,1.3,1.2,0)) +
  scale_y_continuous(limits = c(0, 48)) +
  scale_x_discrete(limits = c('CTP', 'XCTP', 'MATRIX', 'RPL')) +
  theme(legend.position = 'none',
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "Protocols", y = 'ROM footprint (Kb)')
rom_plot

ggsave(filename = "./imgs/new-rom-usage.png",
       plot = rom_plot, device = "png", width = 2.8, height = 2.5, scale = 1.4)

p = grid.arrange(ram_plot, rom_plot, ncol=2)

ggsave(filename = "./imgs/new-ram-rom-usage.png",
       plot = p, device = "png", width = 2.8*2, height = 2.5, scale = 1.4)


############################### TOP-DOWN success ###############################

top_down_data = read.csv("./data/top-down-success.csv")

top_down_data$y_facet = factor(top_down_data$y_facet, levels(top_down_data$y_facet)[c(4,2,3,1)])
top_down_data$x_facet = factor(top_down_data$x_facet, levels(top_down_data$x_facet)[c(4,3,2,1)])
top_down_static = top_down_data %>% dplyr::filter(scn == 1)
top_down_others_scn = top_down_data %>% dplyr::filter(scn != 1)

p = ggplot(top_down_static, aes(x = factor(protocol), y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .65) +
  geom_bar(data = top_down_static, aes(x = protocol, y = mean_plus_losses, colour = protocol),
           alpha = 0.1, size = 0.3,
           stat = "identity", position=position_dodge(1), width = .7) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('RPL', 'MHCL', 'XCTP', 'MATRIX')) +
  theme(legend.position="none",
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = 'Top-down success rate')
p

ggsave(filename = "./imgs/new-top-down-success-static.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 1.4)



p = ggplot(top_down_others_scn, aes(x = factor(protocol), y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .65) +
  geom_bar(data = top_down_others_scn, aes(x = protocol, y = mean_plus_losses, colour = protocol),
           alpha = 0.1, size = 0.3,
           stat = "identity", position=position_dodge(1), width = .7) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('RPL', 'MHCL', 'XCTP', 'MATRIX')) +
  theme(legend.position="none",
        # strip.text = element_text(size = 10, family = 'Arial'),
        strip.background = element_rect(colour="#E5E5E5", fill="#E5E5E5"),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = 'Top-down success rate')

p = p + facet_grid(top_down_others_scn$x_facet ~ top_down_others_scn$y_facet)
p

ggsave(filename = "./imgs/new-top-down-success-grid.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 2)



############################# Any2any success rate #############################

a2a_data = read.csv("./data/any2any-success.csv")

a2a_data$y_facet = factor(a2a_data$y_facet, levels(a2a_data$y_facet)[c(4,2,3,1)])
a2a_data$x_facet = factor(a2a_data$x_facet, levels(a2a_data$x_facet)[c(4,3,2,1)])
a2a_data_static = a2a_data %>% dplyr::filter(scn == 1)
a2a_data_others_scn = a2a_data %>% dplyr::filter(scn != 1)

p = ggplot(a2a_data_static, aes(x = factor(protocol), y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .65) +
  geom_bar(data = a2a_data_static, aes(x = protocol, y = mean_plus_losses, colour = protocol),
           alpha = 0.1, size = 0.3,
           stat = "identity", position=position_dodge(1), width = .7) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('RPL', 'MHCL', 'MATRIX')) +
  theme(legend.position="none",
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = 'Any-to-any success rate')
p

ggsave(filename = "./imgs/new-a2a-success-static.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 1.4)



p = ggplot(a2a_data_others_scn, aes(x = factor(protocol), y = mean, colour = protocol, fill = protocol)) +
  geom_bar(stat = "identity", position=position_dodge(1), width = .7, alpha = .65) +
  geom_bar(data = a2a_data_others_scn, aes(x = protocol, y = mean_plus_losses, colour = protocol),
           alpha = 0.1, size = 0.3,
           stat = "identity", position=position_dodge(1), width = .7) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, width = .2, position = position_dodge(1), colour = "#605f60") +
  #scale_y_continuous(breaks=number_ticks(5)) +
  scale_x_discrete(limits = c('RPL', 'MHCL', 'MATRIX')) +
  theme(legend.position="none",
        # strip.text = element_text(size = 12, family = 'Arial'),
        strip.background = element_rect(colour="#E5E5E5", fill="#E5E5E5"),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  # theme_bw() +
  # theme(axis.text = element_text(size = 12, face = "bold"), axis.title = element_text(size = 13)) +
  labs(x = "", y = 'Any-to-any success rate')

p = p + facet_grid(a2a_data_others_scn$x_facet ~ a2a_data_others_scn$y_facet)
p

ggsave(filename = "./imgs/new-a2a-success-grid.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 2)



################# Response success rate per response interval ##################

# 
# rsr_matrix = cbind(bm, upper1)
# rsr_matrix = as.data.frame(rsr_matrix)
# colnames(rsr_matrix) = c('mean', 'error')
# rsr_matrix$protocol = 'MATRIX'
# 
# 
# rsr_xctp = cbind(bx, upper2)
# rsr_xctp = as.data.frame(rsr_xctp)
# colnames(rsr_xctp) = c('mean', 'error')
# rsr_xctp$protocol = 'XCTP'
# 
# rsr_data = rbind(rsr_xctp, rsr_matrix)
# 
# rsr_data$response_time = rep(times, 2)
# rsr_data$mean = rsr_data$mean / 100
# rsr_data$error = rsr_data$error / 100

# write.csv(rsr_data, './data/respose-success-rate-per-response-time.csv', quote = F, row.names = F)
rsr_data = read.csv("./data/respose-success-rate-per-response-time.csv")

p = ggplot(rsr_data, aes(x = response_time, y = mean, shape = protocol,
                     fill = protocol, colour = protocol)) +
  geom_point(size = 3.5, alpha = 0.85, position = position_dodge(width = 5)) +
  geom_errorbar(aes(ymin = mean - error, ymax = mean + error), 
                size = .7, position = position_dodge(5)) +
  geom_line(aes(linetype = protocol)) + 
  scale_x_continuous(breaks = rsr_data$response_time) + 
  theme(legend.title = element_blank(),
        legend.position = 'top',
        # axis.text.x = element_text(angle = 55, hjust = 1),
        axis.title.y = element_text(margin = unit(c(0,.2,0,0), 'cm')),
        plot.margin = unit(rep(.2, 4), 'cm'),
        legend.text = element_text(size = 12, face = 'bold'),
        # axis.text.y = element_text(angle = 35),
        axis.text.x = element_text(vjust = .7),
        axis.text = element_text(size = 12, angle = 35),
        axis.title = element_text(size = 12), 
        text = element_text(family = 'Times'),
        strip.text = element_text(size = 12)) +
  labs(x = 'Response interval (ms)', y = 'Response success rate')

p

ggsave(filename = "./imgs/new-response-success-per-response-time.png",
       plot = p, device = "png", width = IMG_width, height = IMG_height, scale = 1.4)













