-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jun 2024 pada 08.07
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `errp9428_kel3_workshop_streaming_video`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `comments`
--

CREATE TABLE `comments` (
  `comments_id` int(11) NOT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment_text` text DEFAULT NULL,
  `comment_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `comments`
--

INSERT INTO `comments` (`comments_id`, `video_id`, `user_id`, `comment_text`, `comment_date`) VALUES
(4, '1cb1859fbb2', 3, 'bagus', '2024-05-15 11:39:17'),
(5, '1cb1859fbb2', 3, 'Bagus wah', '2024-05-15 11:40:41'),
(6, '1cb1859fbb2', 4, 'bagus gan', '2024-05-15 11:42:35'),
(7, '12cb1a20cd4', 3, 'Wah bagus ', '2024-05-21 05:02:19'),
(8, '1cb1859fbb2', 3, 'Asep', '2024-05-21 06:39:39'),
(9, '1cb1859fbb2', 3, 'asd', '2024-05-21 13:45:06'),
(10, '03a5f1ae3bf', 4, 'mantaf', '2024-05-27 15:17:50'),
(11, 'e822d5f9f93', 3, 'test', '2024-06-12 02:07:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `episodes`
--

CREATE TABLE `episodes` (
  `episodes_id` int(11) NOT NULL,
  `season_id` int(11) DEFAULT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  `episode_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `episodes`
--

INSERT INTO `episodes` (`episodes_id`, `season_id`, `video_id`, `episode_number`) VALUES
(1, 1, '5a5b8670607', 1),
(2, 1, 'c3e1cf8f879', 2),
(3, 1, '91d1d3da361', 3),
(4, 2, 'e822d5f9f93', 1),
(5, 3, '771343811f2', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `name` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `video_id` varchar(11) DEFAULT NULL,
  `last_watch` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`history_id`, `user_id`, `video_id`, `last_watch`) VALUES
(1, 4, '12cb1a20cd4', '2024-05-22 19:24:56'),
(2, 4, '03a5f1ae3bf', '2024-05-27 15:14:29'),
(3, 3, 'undefined', '2024-05-28 17:22:35'),
(4, 3, '91d1d3da361', '2024-05-29 02:37:07'),
(5, 3, 'e822d5f9f93', '2024-06-12 02:07:45'),
(6, 3, '771343811f2', '2024-06-04 16:03:49'),
(7, 3, 'c3e1cf8f879', '2024-05-29 02:36:53'),
(8, 3, '5a5b8670607', '2024-05-29 02:33:13'),
(9, 3, '03a5f1ae3bf', '2024-05-29 02:36:28'),
(10, 4, 'e822d5f9f93', '2024-06-11 20:48:18'),
(11, 4, 'c3e1cf8f879', '2024-06-08 14:30:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `like_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `likes`
--

INSERT INTO `likes` (`like_id`, `video_id`, `user_id`, `like_date`) VALUES
(1, '1cb1859fbb2', 2, '2024-04-16 15:44:25'),
(2, '03a5f1ae3bf', 4, '2024-05-27 15:17:55'),
(3, 'e822d5f9f93', 3, '2024-06-12 02:07:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `my_list`
--

CREATE TABLE `my_list` (
  `id_mylist` int(11) NOT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `mylistadd_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `my_list`
--

INSERT INTO `my_list` (`id_mylist`, `video_id`, `user_id`, `mylistadd_date`) VALUES
(1, '1cb1859fbb2', 2, NULL),
(2, '1cb1859fbb2', 3, NULL),
(3, '03a5f1ae3bf', 4, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `season`
--

CREATE TABLE `season` (
  `season_id` int(11) NOT NULL,
  `series_id` int(11) NOT NULL,
  `total_episode` int(11) NOT NULL,
  `season_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `season`
--

INSERT INTO `season` (`season_id`, `series_id`, `total_episode`, `season_number`) VALUES
(1, 1, 28, 1),
(2, 2, 24, 1),
(3, 3, 12, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tv_series_details`
--

CREATE TABLE `tv_series_details` (
  `series_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `ongoing` tinyint(1) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `tv_series_details`
--

INSERT INTO `tv_series_details` (`series_id`, `title`, `genre`, `ongoing`, `description`) VALUES
(1, 'Sousou no Frieren', 'Action, Adventure, Documentary, Fantasy', 0, 'During their decade-long quest to defeat the Demon King, the members of the hero\'s party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles, creating unforgettable precious memories for most of them.\r\n\r\nHowever, the time that Frieren spends with her comrades is equivalent to merely a fraction of her life, which has lasted over a thousand years. When the party disbands after their victory, Frieren casually returns to her \"usual\" routine of collecting spells across the continent. Due to her different sense of time, she seemingly holds no strong feelings toward the experiences she went through.\r\n\r\nAs the years pass, Frieren gradually realizes how her days in the hero\'s party truly impacted her. Witnessing the deaths of two of her former companions, Frieren begins to regret having taken their presence for granted; she vows to better understand humans and create real personal connections. Although the story of that once memorable journey has long ended, a new tale is about to begin.'),
(2, 'Kusuriya no Hitorigoto', 'Drama', 0, 'Maomao, an apothecary\'s daughter, has been plucked from her peaceful life and sold to the lowest echelons of the imperial court. Now merely a maid, Maomao settles into her new mundane life and hides her extensive knowledge of medicine in order to avoid any unwanted attention.\r\n\r\nNot long after Maomao\'s arrival, the emperor\'s infant children inexplicably begin to experience grave symptoms—almost as if a curse has been cast. The curious Maomao easily solves the mystery and, to remain out of the limelight, attempts to leave an anonymous tip. Unfortunately, the dashing and perceptive eunuch Jinshi sees through it and manages to single her out.\r\n\r\nIn recognition of her talent, Maomao is promoted to lady-in-waiting for the emperor\'s favorite concubine, Gyokuyou. As Maomao continues to remedy the numerous ailments afflicting the imperial court, her pharmaceutical expertise quickly proves indispensable.'),
(3, 'Blue Archive the Animation', 'Animation', 1, 'Kivotos is a federal megalopolis comprising thousands of schools and is led by the General Student Council (GSC), which acts as its governing body. Ironically, despite being an academy city, Kivotos is rife with gun violence, and all students wield firearms as part of their everyday lives.\r\n\r\nAs if the crisis in Kivotos was not enough, the GSC president is nowhere to be found. Fortunately, before her sudden disappearance, the GSC president enlisted the help of Sensei—a teacher who is most likely the only one in Kivotos—to support students in their time of need. Sensei\'s first course of action is to assist Abydos High School, a once prestigious academy now with merely five students in attendance. These remaining students are doing everything they can to pay their academy\'s crippling debt of almost one billion yen.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'Member',
  `password` varchar(255) DEFAULT NULL,
  `img` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `fullname`, `username`, `email`, `role`, `password`, `img`) VALUES
(2, 'Errorgeist', 'sylens', 'sweetgin04@gmail.com', 'Admin', '$2b$10$rVCFM3GfDIVRlXoOyr2B6.xNWPKbarH2nza.xXaQ0ljs4b9fZ79xe', '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'),
(3, 'Egie Sugina', 'egie', 'egiesugina704@gmail.com', 'Admin', '$2a$12$RWE3h3Vlzq93WTqk64HvFeloTToXK8AkckNuwjGL1C3w9ohQwN/B.', NULL),
(4, 'Tamu', 'tamu', 'egiesugina504@gmail.com', 'Member', '$2a$12$5KrziihJNLCP5qfwzAiBvei3Y3vE43X1esc20aElilCagI5P9WFoa', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `videos`
--

CREATE TABLE `videos` (
  `video_id` varchar(50) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `status` enum('done','process','raw','failed') DEFAULT 'raw',
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `format_raw` varchar(50) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `release_date` datetime DEFAULT NULL,
  `upload_date` datetime DEFAULT current_timestamp(),
  `type` enum('movie','tv_series') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `videos`
--

INSERT INTO `videos` (`video_id`, `user_id`, `title`, `description`, `genre`, `duration`, `status`, `public`, `format_raw`, `views`, `release_date`, `upload_date`, `type`) VALUES
('03a5f1ae3bf', NULL, 'Gyakusatsu Kikan', '<p>The war on terror exploded, literally, the day Sarajevo was destroyed by a homemade nuclear device. The leading democracies transformed into total surveillance states, and the developing world has drowned under a wave of genocides. The mysterious American John Paul seems to be behind the collapse of the world system, and it\'s up to intelligence agent Clavis Shepherd to track John Paul across the wreckage of civilizations and to find the true heart of darkness—a genocidal organ.</p>', 'animation, action, adventure', NULL, 'done', 1, 'mkv', 0, NULL, '2024-04-16 16:18:05', 'movie'),
('12cb1a20cd4', NULL, 'Fate/Grand Order', '<p>Assorted commercials and collaborations for the Fate/Grand Order mobile RPG. These short animations are posted to Type-Moon\'s official YouTube channel and advertise the game itself or promote a new game event (eg. Dead Heat Summer Race! for summer 2017). The animation is unique to these commercials and is not present in the mobile game nor in the TV special of Fate/Grand Order.</p>', 'comedy', NULL, 'done', 1, 'mkv', 0, NULL, '2024-04-14 00:18:25', 'movie'),
('1cb1859fbb2', NULL, 'Saenai Heroine no Sodatekata Fine', '<p>With the second Winter Comiket just around the corner, Blessing Software has been vigorously producing its new game, \"How to Raise a Boring Girlfriend.\" Despite Utaha Kasumigaoka and Eriri Spencer Sawamura leaving the circle, Megumi Katou and Tomoya Aki are hopeful that, by sticking to Tomoya\'s original vision for the game, their upcoming creation will exceed Blessing Software\'s previous installment.</p><p><br></p><p>With the addition of new members Iori and Izumi Hashima, development ensues—but not without its share of setbacks. Things rarely go as planned in the dating sim industry, with numerous obstacles forcing Tomoya to decide between helping his friends or completing the game.</p><p><br></p><p>Saenai Heroine no Sodatekata Fine draws the series to a close as Tomoya selects his final route, both within his personal life and Blessing Software.</p>', 'animation', NULL, 'done', 1, 'mkv', 0, NULL, '2024-04-15 17:34:34', 'movie'),
('5a5b8670607', NULL, 'The Journey\'s End', '<p>After defeating the Demon King, Himmel and his crew return triumphantly to the capital. While they reflect on the past ten years of their adventures and think about their future lives, the elf Frieren is unimpressed and sets off on another quest for magic. Fifty years later, Frieren returns to the Royal Capital to fulfill a promise she made to everyone. This reunion leads her on a new journey.</p>', 'Adventure, Documentary', NULL, 'done', 0, 'mkv', 0, NULL, '2024-05-28 21:22:14', 'tv_series'),
('739932af3cc', NULL, 'Sword Art Online: Progressive Movie - Hoshi Naki Yoru no Aria', '<p>Excelling socially and academically, Asuna Yuuki is on track to ace her high school entrance exams. Her friend and classmate, Misumi \"Mito\" Tozawa, advises her to take a short break from studying and join her on the launch day of Sword Art Online (SAO)—the highly anticipated online virtual reality multiplayer game. Asuna accepts her offer and soon meets her in the game.</p><p><br></p><p>In a cruel twist of fate, Asuna, Mito, and every other player logged into SAO find themselves trapped in the game permanently. The only way out is to clear all one hundred floors of the game, and to make matters worse, dying inside the game will kill the player in real life. With SAO now turned into a nightmare death trap, Asuna and other gamers—such as the lone swordsman Kazuto \"Kirito\" Kirigaya—must adapt and survive, all whilst attempting to beat the unforgiving competition to the top.</p>', 'crime', NULL, 'done', 1, 'mkv', 0, NULL, '2024-04-16 17:42:34', 'movie'),
('771343811f2', NULL, 'Abydos High School Foreclosure Committee', '<p>There are only five students in the whole school. Abydos High School, surrounded by desert, is on the verge of closure. To fight against this, the 5 of them are busy working as a \"task force.\" One day, Shiroko, a student, meets an adult. He was a \"Sensei\" dispatched by the Federal Student Council.</p>', 'Action, Adventure, Comedy', NULL, 'done', 0, 'mkv', 0, NULL, '2024-05-29 01:00:13', 'tv_series'),
('91d1d3da361', NULL, 'Killing Magic', '<p>Frieren and Fern arrive in the trading town of Warm. Fearing Frieren\'s intentions to split up, Fern decides to follow her. What is Frieren\'s true intention? After leaving Warm, they stumble across a village where an elderly man welcomes and guides them to the site of Qual, a Demon sealed away by Frieren during her journey eighty years prior.</p>', 'Action, Adventure, Documentary, Fantasy', NULL, 'done', 0, 'mkv', 0, NULL, '2024-05-28 19:21:43', 'tv_series'),
('c3e1cf8f879', NULL, 'It Didn\'t Have to Be Magic…', '<p>Frieren visits Heiter, who lives deep in the forest, and meets Fern, an orphan who lives with him. Heiter asks her to teach him magic, which Frieren does. After a certain event, they set out on a journey together. Frieren visits a village with a statue of Himmel, and remembers a flower that Himmel said he loved before his death...</p>', 'Action, Adventure', NULL, 'done', 0, 'mkv', 0, NULL, '2024-05-28 21:23:29', 'tv_series'),
('e822d5f9f93', NULL, 'Maomao', '<p>Maomao, a young maiden running a pharmacy in the red-light district, is kidnapped and forced into servitude at the emperor\'s palace. Upon hearing rumors of a \"curse\" causing the deaths of the emperor\'s heirs, her curiosity drives her to investigate. Fueled by her unquenchable curiosity and her expertise in medicine and poison, Maomao resolves to take action.</p>', 'Drama, Fantasy, Romance', NULL, 'done', 0, 'mkv', 0, NULL, '2024-05-29 00:02:40', 'tv_series');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comments_id`);

--
-- Indeks untuk tabel `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`episodes_id`);

--
-- Indeks untuk tabel `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indeks untuk tabel `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indeks untuk tabel `my_list`
--
ALTER TABLE `my_list`
  ADD PRIMARY KEY (`id_mylist`);

--
-- Indeks untuk tabel `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`season_id`);

--
-- Indeks untuk tabel `tv_series_details`
--
ALTER TABLE `tv_series_details`
  ADD PRIMARY KEY (`series_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`video_id`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `comments_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `episodes`
--
ALTER TABLE `episodes`
  MODIFY `episodes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `my_list`
--
ALTER TABLE `my_list`
  MODIFY `id_mylist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `season`
--
ALTER TABLE `season`
  MODIFY `season_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `tv_series_details`
--
ALTER TABLE `tv_series_details`
  MODIFY `series_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
