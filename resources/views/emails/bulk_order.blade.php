<!DOCTYPE html>
<html>
<head>
    <title>Email</title>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>total_price</th>
                <th>unit_price</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>message</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $body['title'] }} </td>
                <td>{{ $body['quantity'] }} </td>
                <td>{{ $body['total_price'] }} </td>
                <td>{{ $body['unit_price'] }} </td>
                <td>{{ $body['name'] }} </td>
                <td>{{ $body['email'] }} </td>
                <td>{{ $body['phone'] }} </td>
                <td>{{ $body['message'] }} </td>
            </tr>
        </tbody>
    </table>
</body>
</html>