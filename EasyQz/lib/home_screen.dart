import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4, // Number of tabs
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Home'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Trending Links'),
              Tab(text: 'Trending Topics'),
              Tab(text: 'Top Authors'),
              Tab(icon: Icon(Icons.add)),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            _TabContent(title: "Trending Links"),
            _TabContent(title: "Trending Topics"),
            _TabContent(title: "Top Authors"),
            _TabContent(title: "Add New Content"),
          ],
        ),
      ),
    );
  }
}

class _TabContent extends StatelessWidget {
  final String title;

  const _TabContent({required this.title});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        title,
        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      ),
    );
  }
}
