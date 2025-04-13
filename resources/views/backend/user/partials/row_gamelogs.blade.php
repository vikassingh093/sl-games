<tr>
    <td>
        <span class="label label-inverse">{{$gamelog->name}}</span>
    </td>    
    <td>{{$gamelog->account}}</td>
    <td>{{$gamelog->game}}</td>
    <td style="text-align: right;">
        <span class="badge badge-success" style="text-align: center; width: 90%;">
            {{$gamelog->bet}} </span>
    </td>
    <td style="text-align: right;">
        <span class="badge badge-success" style="text-align: center; width: 90%;">
            {{$gamelog->win}} </span>
    </td>    
    <td class="muted">
        {{$gamelog->date_time}} </td>    
    <td class="print">
    </td>
</tr>