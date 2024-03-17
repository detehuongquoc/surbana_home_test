INSERT INTO Location (location_name, location_number, area, parent_location) VALUES
('A Car Park', 'A.CarPark', 80.620, ''),
('A Level 1', 'A.01', 100.920, 'A.CarPark'),
('A Lobby Level1', 'A.01.Lobby', 80.620, 'A.01'),
('A Master Room', 'A.01.01', 50.110, 'A.01.Lobby'),
('A Meeting Room 1', 'A.01.01.M1', 20.110, 'A.01.01');
