@extends('masterHome')
@section('NoiDung')
 <h4>Danh sach cac nhan vien trong cong ty</h4>
 <ul>
    @foreach ($lstNhanVien as  $nhanvien)
        <li>ID: {{$nhanvien->id . " "}} Ten: {{$nhanvien->name}}</li>
    @endforeach
 </ul>
 {!! $lstNhanVien->links()!!}
 {{-- {!!$lstNhanVien->appends(['id' =>'1'])->links() !!} --}}

{{-- test thư viện  --}}


@endsection
