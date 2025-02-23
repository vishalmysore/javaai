import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SearchScreen extends StatefulWidget {
  // Mark the constructor as const
  const SearchScreen({super.key});
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  TextEditingController _controller = TextEditingController();
  String _responseText = "Enter a topic and choose difficulty";

  Future<void> _fetchData(String difficulty) async {
    final String userInput = _controller.text.trim();
    if (userInput.isEmpty) return;

    final response = await http.get(Uri.parse(
        'https://yourbackend.com/api/generate-quiz?query=$userInput&difficulty=$difficulty'));

    if (response.statusCode == 200) {
      setState(() {
        _responseText = jsonDecode(response.body)['questions'].toString();
      });
    } else {
      setState(() {
        _responseText = "Error fetching data";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Search Quiz")),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: "Enter a topic or link",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(onPressed: () => _fetchData("Easy"), child: Text("Easy")),
                ElevatedButton(onPressed: () => _fetchData("Tough"), child: Text("Tough")),
                ElevatedButton(onPressed: () => _fetchData("Tougher"), child: Text("Tougher")),
                ElevatedButton(onPressed: () => _fetchData("Crazy"), child: Text("Crazy")),
              ],
            ),
            SizedBox(height: 20),
            Text(_responseText),
          ],
        ),
      ),
    );
  }
}
