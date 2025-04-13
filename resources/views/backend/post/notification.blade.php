<!DOCTYPE html>
@extends('backend.layouts.app')

@section('page-title', trans('app.users'))
@section('page-heading', trans('app.users'))

@section('content')
	<section class="content-header">
	@include('backend.partials.messages')
	</section>

	<section class="content">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <div id="main-content" class="for-print">            
        <div id="modal-create" class="modal hide fade" aria-hidden="true" style="display: none;">
            <form id="uploadForm" action="" enctype="multipart/form-data" method="post">
                @csrf
                <div class="align-items-center" style="padding: 20px;">
                    <label for="caption" class="description-content">Title</label>                    
                    <input id="caption" type="text" class="description-content" name="caption"required autocomplete="caption" autofocus>
                    <div class="div pt-4">
                        <textarea id="p_description" placeholder="Description" class="description-content" required name="description"  style="height: 300px"></textarea>                        
                    </div>     
                    <div class="pt-5 align-items-center">
                        <div class="dot col-4 align-items-center pt-5 pb-5" id="dropzone" style="background-size: contain;">                                                
                            <input type="file" class="form-control-file @error('image') is-invalid @enderror" style="display: none" id="image" name="image">    
                        </div>
                        <div class="d-flex">
                            <button type="button" class="btn-link" id="selectImage">Select an image</a>
                        </div>                        
                    </div>               
                </div>
                <div class="modal-footer">
                    <input class="btn btn-success" type="button" value="  Add  " onclick="addNews()"> 
                    <input class="btn" data-dismiss="modal" aria-hidden="true" type="button" value="Cancel">
                </div>
            </form>
        </div>

        @if(auth()->user()->hasRole(['admin']))
        <div class="row">
            <p>
                <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#modal-create">
                <i class="icon-plus icon-white"></i> Add notification </button>
            </p>
        </div>
        @endif
        <div class="row">
                @foreach($posts as $post)
                <div class="description-content">
                    <h1>{{$post->title}}</h1>
                    <h3>{{$post->content}}</h3>
                    <div class="div">
                        <img src="{{$post->url}}">
                    </div>                    
                    @if(auth()->user()->hasRole(['admin']))
                    <button type="button" class="btn btn-warning" style="margin-top: 2px;"  onclick="deletePost('{{$post->Id}}')">
                        <i class="gg-trash"></i>
                    </button>                    
                    @endif
                </div>
                @endforeach
            </div>

            <!-- The expanding image container -->
            <div class="gallery_container">
            <!-- Close the image -->
            <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

            <!-- Expanded image -->
            <img id="expandedImg" style="width:100%">

            <!-- Image text -->
            <div id="imgtext"></div>
            </div>
        </div>
	</section>	
@stop

@section('scripts')
	<script>
        var form;
        var file;
                
        window.addEventListener('load', function(){
            form = document.getElementById("dropzone");
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                
                form.addEventListener(event, function (e) {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter'].forEach(function (event) {
                form.addEventListener(event, function () {
                    form.classList.add('dragover');
                });            

                form.addEventListener('drop', function (e) {
                    var droppedFiles;
                    droppedFiles = e.dataTransfer.files; // the files that were dropped

                    if (droppedFiles.length > 0)
                    {
                        file = droppedFiles[0];
                        $("#image").prop('files', droppedFiles);
                        var reader = new FileReader();
                        reader.onload = (function(f){
                            return function(e) {
                                $(".thumb").remove();
                                var div = '<div class="thumb"  style="width: 100%; height: 100%"> \
                                    <img class="center" src="' + e.target.result + '" title="' + escape(f.name) + '"/> \
                                    <div class="close" style="cursor:pointer">X</div> \
                                </div>';
                                $("#dropzone").append(div);                            
                                $('img').on('load',function(){
                                    var css;
                                    var ratio=$(this).width() / $(this).height();
                                    var pratio=$(this).parent().width() / $(this).parent().height();
                                    if (ratio <= pratio) css={width:'auto', height:'100%'};
                                    else css={width:'100%', height:'auto'};
                                    $(this).css(css);
                                });
                            };
                        })(file);
                        reader.readAsDataURL(file);
                    }
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(function (event) {
                form.addEventListener(event, function () {
                    form.classList.remove('dragover');
                });
            });

            $("#dropzone").on("click", ".close", function(e) {
                var $target = $(e.target);
                var idx = $target.attr('data-idx');
                $target.parent().remove(); 
            });

            $("#selectImage").on("click", function(e){
                $("#image").click();
            });

            $("#image").change(function(){   
                if(this.files.length == 0)
                    return;
                var file = this.files[0];
                var reader = new FileReader();
                
                reader.onload = (function(f){
                    return function(e) {
                        $(".thumb").remove();
                        var div = '<div class="thumb" style="width: 100%; height: 100%"> \
                            <img class="center" src="' + e.target.result + '" title="' + escape(f.name) + '"/> \
                            <div class="close" style="cursor:pointer">X</div> \
                        </div>';
                        $("#dropzone").append(div);
                        $('img').on('load',function(){
                            var css;
                            var ratio=$(this).width() / $(this).height();
                            var pratio=$(this).parent().width() / $(this).parent().height();
                            if (ratio <= pratio) css={width:'auto', height:'100%'};
                            else css={width:'100%', height:'auto'};
                            $(this).css(css);
                        });
                    };
                })(file);
                reader.readAsDataURL(file);
            });
        });

        function deletePost(id)
        {
            if(confirm("Do you want to really remove this content?"))
            {
                var formData = new FormData();
                formData.append('content_id', id);
                $.ajax({
                    type: 'POST',
                    url: '{!! route("backend.post.delete") !!}',
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : formData,
                    success: function(result){
                        console.log(result);
                        var res = JSON.parse(result);
                        if(res.status == "success")
                        {
                            window.location.reload()
                        }
                        else if(res.status == "failure")
                        {
                            alert(res.error);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }            
        }

        function addNews()
        {
            var formData = new FormData();
            var title = $("#caption").val();
            if(title == '')
            {
                alert("Please input title");
                return;
            }
            var description = $("#p_description").val();
            if(description == '')
            {
                alert("Please input news content");
                return;
            }

            var image_file = $("#image").prop("files");

            formData.append('title', title);
            formData.append('content', description);
            if(image_file.length > 0)
                formData.append('thumbnail', image_file[0]);
            $.ajax({
                type: 'POST',
                url: '{!! route("backend.post.addnotification") !!}',
                cache: false,
                contentType: false,
                processData: false,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : formData,
                success: function(result){
                    console.log(result);
                    var res = JSON.parse(result);
                    if(res.status == "success")
                    {
                        window.location.reload()
                    }
                    else if(res.status == "failure")
                    {
                        alert(res.error);
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }       
        
	</script>
@stop
